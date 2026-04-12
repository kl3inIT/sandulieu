import type { ReactNode } from "react";

type SummaryFieldProps = {
  label: string;
  value: ReactNode;
};

export function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
