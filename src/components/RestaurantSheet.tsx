import { Star, Clock, Bike, ExternalLink, TrendingDown, Trophy } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { PriceBadge } from "./PriceBadge";
import {
  cheapestPlatform,
  computeDealScores,
  getOrderUrl,
  platformMeta,
  type Platform,
  type Restaurant,
} from "@/data/restaurants";

export function RestaurantSheet({
  restaurant,
  open,
  onOpenChange,
}: {
  restaurant: Restaurant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const platforms = Object.keys(restaurant.fees) as Platform[];
  const cheapestOverall = cheapestPlatform(restaurant.fees);
  const dealScores = computeDealScores(restaurant);
  const bestDeal = dealScores[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl p-0 overflow-y-auto pb-safe"
      >
        {/* Hero */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.categories.join(", ")}</span>
            </div>
            <SheetHeader className="text-left space-y-1">
              <SheetTitle className="font-display text-2xl">
                {restaurant.name}
              </SheetTitle>
              <SheetDescription>{restaurant.tagline}</SheetDescription>
            </SheetHeader>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-5 sm:space-y-6">
          {/* Stats */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Star className="size-3.5 fill-primary text-primary" />
              {restaurant.rating}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Clock className="size-3.5" /> {restaurant.deliveryMin} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Bike className="size-3.5" />
              from ₼{Math.min(...(Object.values(restaurant.fees) as number[])).toFixed(2)}
            </span>
          </div>

          {/* Deal Score */}
          <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Deal Score
              </p>
              <p className="text-[10px] text-muted-foreground">price 45% · speed 35% · discount 20%</p>
            </div>

            {dealScores.map(({ platform, fee, deliveryMin, score, isBest }) => (
              <div key={platform} className={`rounded-xl border p-3 space-y-2 ${isBest ? "border-success/40 bg-success/5" : "border-border"}`}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {isBest && <Trophy className="size-3.5 text-amber-500 shrink-0" />}
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: platformMeta[platform].color }}
                    />
                    <span className="font-semibold">{platformMeta[platform].label}</span>
                    {isBest && (
                      <span className="text-[10px] font-bold text-success uppercase tracking-wide">
                        Best Deal
                      </span>
                    )}
                  </div>
                  <span className={`font-display font-bold tabular-nums ${isBest ? "text-success" : "text-foreground"}`}>
                    {score}<span className="text-[10px] font-normal text-muted-foreground">/100</span>
                  </span>
                </div>

                {/* Score bar */}
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isBest ? "bg-success" : "bg-muted-foreground/40"}`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="flex gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bike className="size-3" />
                    ₼{fee.toFixed(2)} fee
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    ~{deliveryMin} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3 fill-primary text-primary" />
                    {restaurant.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Menu */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">
              Menu — Price Comparison
            </h3>
            {restaurant.menu.map((item) => {
              const itemCheapest = cheapestPlatform(item.prices);
              const itemPlatforms = Object.keys(item.prices) as Platform[];
              const cheapestPrice = item.prices[itemCheapest!]!;
              const maxPrice = Math.max(...(Object.values(item.prices) as number[]));
              const savings = ((maxPrice - cheapestPrice) / maxPrice) * 100;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-card border border-border p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {savings > 1 && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-success/10 text-success text-[10px] font-bold px-2 py-1">
                        <TrendingDown className="size-3" />
                        {savings.toFixed(0)}%
                      </span>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    {itemPlatforms.map((p) => (
                      <PriceBadge
                        key={p}
                        platform={p}
                        price={item.prices[p]!}
                        cheapest={p === itemCheapest}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order buttons */}
          <div className="space-y-2 pt-2 sticky bottom-0 bg-background pb-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              Order on
            </p>
            {dealScores.map(({ platform, isBest }) => (
              <a
                key={platform}
                href={getOrderUrl(restaurant, platform)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 font-semibold text-sm transition ${
                  isBest
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90"
                    : "bg-card border border-border hover:bg-accent"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: platformMeta[platform].color }}
                  />
                  Order on {platformMeta[platform].label}
                  {isBest && <span className="ml-1">✅</span>}
                </span>
                <ExternalLink className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
