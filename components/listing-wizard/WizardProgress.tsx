import { addListingProgressPercent } from "@/components/listing-wizard/wizardSteps";

type WizardProgressProps = {
  step: number;
  title: string;
};

export function WizardProgress({ step, title }: WizardProgressProps) {
  const pct = addListingProgressPercent(step);

  return (
    <div className="mb-12">
      <div className="mb-4 flex justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
          Step {step} of 5: {title}
        </span>
        <span className="text-xs font-bold text-on-tertiary-container md:text-sm">{pct}% Complete</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-low">
        <div
          className="h-full bg-gradient-to-r from-primary to-tertiary-fixed-dim transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
