import { useState } from "react";
import { Clock, Star, MapPin, ExternalLink } from "lucide-react";
import { computeDealScores, platformMeta, type Restaurant } from "@/data/restaurants";
import { RestaurantSheet } from "./RestaurantSheet";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [open, setOpen] = useState(false);
  const dealScores = computeDealScores(restaurant);
  const bestDeal = dealScores[0];
  const bestUrl = bestDeal ? platformMeta[bestDeal.platform].url : "#";
  const bestLabel = bestDeal ? platformMeta[bestDeal.platform].label : "";

  return (
    <>
      <div className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block text-left"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              loading="lazy"
              className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-sm">
              <Star className="size-3 fill-primary text-primary" />
              {restaurant.rating}
            </div>
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-sm">
              <Clock className="size-3" /> {restaurant.deliveryMin} min
            </div>
          </div>
        </button>

        <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block text-left"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-base sm:text-lg leading-tight truncate">{restaurant.name}</h3>
              <span className="text-xs text-muted-foreground shrink-0">{restaurant.cuisine}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-0.5">{restaurant.tagline}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="size-3" /> {restaurant.neighborhood}, Baku
            </div>
          </button>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Deal Score</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground hidden sm:block">fee · speed · value</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {dealScores.map(({ platform, fee, deliveryMin, score, isBest }) => (
                <div
                  key={platform}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 sm:py-2 transition ${
                    isBest ? "border-success/40 bg-success/5" : "border-border bg-card"
                  }`}
                >
                  <span
                    className="size-2 sm:size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: platformMeta[platform].color }}
                  />
                  <span className="font-medium flex-1 truncate text-xs sm:text-sm">{platformMeta[platform].label}</span>
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground tabular-nums">
                    ₼{fee.toFixed(2)} · {deliveryMin}m
                  </span>
                  <span
                    className={`font-display font-bold text-xs sm:text-sm tabular-nums ${
                      isBest ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {score}
                  </span>
                  {isBest && <span className="text-success text-xs leading-none">✅</span>}
                </div>
              ))}
            </div>
          </div>

          <a
            href={bestUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            Order — {bestLabel}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <RestaurantSheet restaurant={restaurant} open={open} onOpenChange={setOpen} />
    </>
  );
}
