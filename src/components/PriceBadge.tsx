import { Check } from "lucide-react";
import { type Platform, platformMeta } from "@/data/restaurants";

export function PriceBadge({
  platform,
  price,
  cheapest,
  size = "md",
}: {
  platform: Platform;
  price: number;
  cheapest?: boolean;
  size?: "sm" | "md";
}) {
  const meta = platformMeta[platform];
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-xl border transition-all ${
        cheapest
          ? "border-success/40 bg-success/5 shadow-[0_0_0_1px_var(--success)]/10"
          : "border-border bg-card"
      } ${size === "sm" ? "px-2.5 py-1.5" : "px-3 py-2"}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="size-2 rounded-full shrink-0"
          style={{ backgroundColor: meta.color }}
          aria-hidden
        />
        <span className={`font-medium truncate ${size === "sm" ? "text-xs" : "text-sm"}`}>{meta.label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`font-display font-semibold tabular-nums ${size === "sm" ? "text-sm" : "text-base"}`}>
          {price.toFixed(2)}
        </span>
        <span className={`text-muted-foreground ${size === "sm" ? "text-[10px]" : "text-xs"}`}>AZN</span>
        {cheapest && (
          <span className="ml-1 inline-flex items-center gap-0.5 rounded-full bg-success px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-success-foreground">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
        )}
      </div>
    </div>
  );
}
