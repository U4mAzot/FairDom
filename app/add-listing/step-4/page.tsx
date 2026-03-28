import type { Metadata } from "next";
import { AddListingStep4 } from "@/components/listing-wizard/AddListingStep4";

export const metadata: Metadata = {
  title: "Dodaj ogłoszenie — media | FairDom",
  description: "Dodaj zdjęcia do ogłoszenia.",
};

export default function AddListingStep4Page() {
  return <AddListingStep4 />;
}
