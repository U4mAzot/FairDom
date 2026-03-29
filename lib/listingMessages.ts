import type { SupabaseClient } from "@supabase/supabase-js";

export type ListingConversationRow = {
  id: string;
  listing_slug: string;
  listing_title: string;
  seller_id: string;
  buyer_id: string;
  last_message_at: string;
};

export type ListingMessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export async function upsertConversationAndSendFirstMessage(
  supabase: SupabaseClient,
  params: {
    listingSlug: string;
    listingTitle: string;
    sellerId: string;
    buyerId: string;
    body: string;
  },
): Promise<{ error: Error | null }> {
  if (params.sellerId === params.buyerId) {
    return { error: new Error("Nie możesz napisać do własnej oferty.") };
  }

  const { data: existing } = await supabase
    .from("listing_conversations")
    .select("id")
    .eq("listing_slug", params.listingSlug)
    .eq("buyer_id", params.buyerId)
    .maybeSingle();

  let conversationId = existing?.id;

  if (!conversationId) {
    const { data: inserted, error: insErr } = await supabase
      .from("listing_conversations")
      .insert({
        listing_slug: params.listingSlug,
        listing_title: params.listingTitle,
        seller_id: params.sellerId,
        buyer_id: params.buyerId,
      })
      .select("id")
      .single();

    if (insErr || !inserted) {
      return { error: new Error(insErr?.message ?? "Nie udało się utworzyć konwersacji.") };
    }
    conversationId = inserted.id;
  }

  const { error: msgErr } = await supabase.from("listing_messages").insert({
    conversation_id: conversationId,
    sender_id: params.buyerId,
    body: params.body.trim(),
  });

  if (msgErr) {
    return { error: new Error(msgErr.message) };
  }
  return { error: null };
}

export async function sendListingMessage(
  supabase: SupabaseClient,
  params: { conversationId: string; senderId: string; body: string },
): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("listing_messages").insert({
    conversation_id: params.conversationId,
    sender_id: params.senderId,
    body: params.body.trim(),
  });
  if (error) return { error: new Error(error.message) };
  return { error: null };
}

export async function fetchConversationsAsSeller(
  supabase: SupabaseClient,
  sellerId: string,
): Promise<{ data: ListingConversationRow[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("listing_conversations")
    .select("id, listing_slug, listing_title, seller_id, buyer_id, last_message_at")
    .eq("seller_id", sellerId)
    .order("last_message_at", { ascending: false });

  if (error) return { data: [], error: new Error(error.message) };
  return { data: (data ?? []) as ListingConversationRow[], error: null };
}

export async function fetchConversationsAsBuyer(
  supabase: SupabaseClient,
  buyerId: string,
): Promise<{ data: ListingConversationRow[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("listing_conversations")
    .select("id, listing_slug, listing_title, seller_id, buyer_id, last_message_at")
    .eq("buyer_id", buyerId)
    .order("last_message_at", { ascending: false });

  if (error) return { data: [], error: new Error(error.message) };
  return { data: (data ?? []) as ListingConversationRow[], error: null };
}

export async function fetchMessagesForConversation(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<{ data: ListingMessageRow[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("listing_messages")
    .select("id, conversation_id, sender_id, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return { data: [], error: new Error(error.message) };
  return { data: (data ?? []) as ListingMessageRow[], error: null };
}
