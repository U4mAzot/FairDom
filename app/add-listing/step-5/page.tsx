import type { Metadata } from "next";
import { AddListingStep5 } from "@/components/listing-wizard/AddListingStep5";

export const metadata: Metadata = {
  title: "Dodaj ogłoszenie — publikacja | FairDom",
  description: "Podsumowanie i publikacja ogłoszenia.",
};

export default function AddListingStep5Page() {
  return <AddListingStep5 />;
}
