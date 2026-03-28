import { RequireAccountForListing } from "@/components/listing-wizard/RequireAccountForListing";

export default function AddListingLayout({ children }: { children: React.ReactNode }) {
  return <RequireAccountForListing>{children}</RequireAccountForListing>;
}
