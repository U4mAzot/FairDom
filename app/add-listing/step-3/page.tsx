import type { Metadata } from "next";
import { PropertyDetailsStep } from "@/components/listing-wizard/PropertyDetailsStep";

export const metadata: Metadata = {
  title: "Dodaj ogłoszenie — szczegóły | FairDom",
  description: "Krok 3 z 5: szczegóły nieruchomości i lokalizacja na mapie.",
};

export default function AddListingStep3Page() {
  return <PropertyDetailsStep />;
}
