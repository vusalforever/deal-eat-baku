import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Bike, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import { RestaurantCard } from "@/components/RestaurantCard";
import { cuisines, restaurants, type CategoryKey } from "@/data/restaurants";

type RestaurantsSearch = { category?: CategoryKey };

export const Route = createFileRoute("/restaurants")({
  validateSearch: (search: Record<string, unknown>): RestaurantsSearch => {
    const cat = typeof search.category === "string" ? (search.category as CategoryKey) : undefined;
    return { category: cat };
  },
  head: () => ({
    meta: [
      { title: "Restoranlar — DealEat Bakı" },
      { name: "description", content: "Bakıdakı restoranları platformalar arasında qiymət üzrə müqayisə edin." },
    ],
  }),
  component: RestaurantsPage,
});

function RestaurantsPage() {
  const [address, setAddress] = useState("Nizami küç. 25, Bakı");
  const [cuisine, setCuisine] = useState("Hamısı");
  const [maxTime, setMaxTime] = useState(60);
  const [maxFee, setMaxFee] = useState(5);
  const [hovered, setHovered] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (cuisine !== "Hamısı" && r.cuisine !== cuisine) return false;
      if (r.deliveryMin > maxTime) return false;
      const minFee = Math.min(...(Object.values(r.fees) as number[]));
      if (minFee > maxFee) return false;
      return true;
    });
  }, [cuisine, maxTime, maxFee]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar address={address} onAddressChange={setAddress} />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Map */}
        <div className="mb-6">
          <MapView activeId={hovered} />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Filter className="size-4 text-primary" />
            Filtrlər
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {cuisines.map((c) => (
              <button
                key={c}
                onClick={() => setCuisine(c)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition border ${
                  cuisine === c
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">≤</span>
              <select
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="bg-card border border-border rounded-lg px-2 py-1 text-sm outline-none focus:border-primary"
              >
                {[20, 30, 45, 60].map((v) => (
                  <option key={v} value={v}>{v} dəq</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Bike className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">≤</span>
              <select
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="bg-card border border-border rounded-lg px-2 py-1 text-sm outline-none focus:border-primary"
              >
                {[2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>{v.toFixed(2)} AZN</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display font-bold text-2xl">{filtered.length} restoran tapıldı</h2>
          <p className="text-sm text-muted-foreground">Qiymətlər real vaxtda yenilənir</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => (
            <div key={r.id} onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(undefined)}>
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Filtrlərə uyğun restoran tapılmadı.
          </div>
        )}
      </div>
    </div>
  );
}
