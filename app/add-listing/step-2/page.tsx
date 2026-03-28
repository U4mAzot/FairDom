import type { Metadata } from "next";
import { AddListingStep2 } from "@/components/listing-wizard/AddListingStep2";

export const metadata: Metadata = {
  title: "Dodaj ogłoszenie — krok 2 | FairDom",
  description: "Podstawowe informacje o ogłoszeniu.",
};

export default function AddListingStep2Page() {
  return <AddListingStep2 />;
}
