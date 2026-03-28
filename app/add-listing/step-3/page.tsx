import type { Metadata } from "next";
import { PropertyDetailsStep } from "@/components/listing-wizard/PropertyDetailsStep";

export const metadata: Metadata = {
  title: "Add Listing — Property Details | FairDom",
  description: "Step 3 of 5: enter property details and pin your listing on the map.",
};

export default function AddListingStep3Page() {
  return <PropertyDetailsStep />;
}
