import { Star, Clock, Bike, ExternalLink, TrendingDown } from "lucide-react";
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
  const platforms = Object.keys(restaurant.popularPrice) as Platform[];
  const cheapestOverall = cheapestPlatform(restaurant.popularPrice);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl p-0 overflow-y-auto"
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

        <div className="p-5 space-y-6">
          {/* Stats */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Star className="size-3.5 fill-primary text-primary" />
              {restaurant.rating}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Clock className="size-3.5" /> {restaurant.deliveryMin} dəq
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-card border border-border px-3 py-1.5">
              <Bike className="size-3.5" />
              {Math.min(...(Object.values(restaurant.fees) as number[])).toFixed(2)} AZN-dən
            </span>
          </div>

          {/* Platform delivery fees */}
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
              Platformalar və çatdırılma
            </p>
            <div className="space-y-2">
              {platforms.map((p) => (
                <div key={p} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: platformMeta[p].color }}
                    />
                    <span className="font-medium">{platformMeta[p].label}</span>
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {restaurant.fees[p]!.toFixed(2)} AZN
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">
              Menyu — qiymət müqayisəsi
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
              Sifariş et
            </p>
            {platforms.map((p) => (
              <a
                key={p}
                href={platformMeta[p].url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 font-semibold text-sm transition ${
                  p === cheapestOverall
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90"
                    : "bg-card border border-border hover:bg-accent"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: platformMeta[p].color }}
                  />
                  Sifariş et — {platformMeta[p].label}
                  {p === cheapestOverall && <span className="ml-1">✅</span>}
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
