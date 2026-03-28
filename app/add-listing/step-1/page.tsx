import type { Metadata } from "next";
import { AddListingStep1 } from "@/components/listing-wizard/AddListingStep1";

export const metadata: Metadata = {
  title: "Dodaj ogłoszenie — krok 1 | FairDom",
  description: "Wybierz typ oferty i rozpocznij dodawanie ogłoszenia.",
};

export default function AddListingStep1Page() {
  return <AddListingStep1 />;
}
