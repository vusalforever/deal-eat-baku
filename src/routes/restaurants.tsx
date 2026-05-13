import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Bike, Filter, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cuisines, restaurants, cheapestPlatform, platformMeta, type CategoryKey, type Restaurant } from "@/data/restaurants";

type RestaurantsSearch = { category?: CategoryKey; address?: string };

export const Route = createFileRoute("/restaurants")({
  validateSearch: (search: Record<string, unknown>): RestaurantsSearch => {
    const cat = typeof search.category === "string" ? (search.category as CategoryKey) : undefined;
    const addr = typeof search.address === "string" ? search.address : undefined;
    return { category: cat, address: addr };
  },
  head: () => ({
    meta: [
      { title: "Restoranlar — DealEat Bakı" },
      { name: "description", content: "Bakıdakı restoranları platformalar arasında qiymət üzrə müqayisə edin." },
    ],
  }),
  component: RestaurantsPage,
});

async function geocodeBaku(query: string): Promise<[number, number] | null> {
  const q = encodeURIComponent(`${query}, Baku, Azerbaijan`);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=az`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (!data.length) return null;
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {
    return null;
  }
}

function RestaurantsPage() {
  const navigate = Route.useNavigate();
  const { category, address: addrParam } = Route.useSearch();
  const [address, setAddress] = useState(addrParam ?? "Nizami küç. 25, Bakı");
  const [center, setCenter] = useState<[number, number] | undefined>();
  const [locating, setLocating] = useState(false);
  const [cuisine, setCuisine] = useState("Hamısı");
  const [maxTime, setMaxTime] = useState(60);
  const [maxFee, setMaxFee] = useState(5);
  const [hovered, setHovered] = useState<string | undefined>();

  const handleSubmit = async (q: string) => {
    const result = await geocodeBaku(q);
    if (result) {
      setCenter(result);
      toast.success(`Yer tapıldı: ${q}`);
    } else {
      toast.error("Yer tapılmadı. Başqa ad sınayın.");
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      toast.error("Brauzeriniz GPS dəstəkləmir.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setAddress("Mənim yerim");
        setLocating(false);
        toast.success("Yeriniz tapıldı");
      },
      () => {
        setLocating(false);
        toast.error("Yer alına bilmədi.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Auto-geocode when address arrives via URL param
  useEffect(() => {
    if (addrParam) handleSubmit(addrParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addrParam]);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (cuisine !== "Hamısı" && r.cuisine !== cuisine) return false;
      if (category && !r.categories.includes(category)) return false;
      if (r.deliveryMin > maxTime) return false;
      const minFee = Math.min(...(Object.values(r.fees) as number[]));
      if (minFee > maxFee) return false;
      return true;
    });
  }, [cuisine, category, maxTime, maxFee]);

  const [spotlightId, setSpotlightId] = useState<string | undefined>();
  const [deciding, setDeciding] = useState(false);
  const [picked, setPicked] = useState<Restaurant | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleDecide = () => {
    if (!filtered.length || deciding) {
      if (!filtered.length) toast.error("Seçim üçün restoran yoxdur.");
      return;
    }
    setDeciding(true);
    setPicked(null);
    const finalIdx = Math.floor(Math.random() * filtered.length);
    let i = 0;
    const total = 16 + finalIdx;
    const tick = () => {
      const idx = i % filtered.length;
      setSpotlightId(filtered[idx].id);
      i++;
      if (i <= total) {
        setTimeout(tick, 80 + i * 12);
      } else {
        const chosen = filtered[finalIdx];
        setSpotlightId(chosen.id);
        cardRefs.current[chosen.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          setPicked(chosen);
          setDeciding(false);
        }, 600);
      }
    };
    tick();
  };

  const pickedCheapest = picked ? cheapestPlatform(picked.popularPrice) : null;
  const pickedMeta = pickedCheapest ? platformMeta[pickedCheapest] : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        address={address}
        onAddressChange={setAddress}
        onAddressSubmit={handleSubmit}
        onLocate={handleLocate}
        locating={locating}
        activeCategory={category}
        onCategorySelect={(key) =>
          navigate({ search: (prev: RestaurantsSearch) => ({ ...prev, category: key }) })
        }
        onDecide={handleDecide}
        deciding={deciding}
      />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Map */}
        <div className="mb-6">
          <MapView activeId={hovered} center={center} restaurants={filtered} />
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
          {filtered.map((r) => {
            const isSpot = spotlightId === r.id;
            return (
              <div
                key={r.id}
                ref={(el) => { cardRefs.current[r.id] = el; }}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(undefined)}
                className={`rounded-3xl transition-all duration-200 ${
                  isSpot
                    ? "ring-4 ring-primary ring-offset-2 ring-offset-background scale-[1.03] shadow-[var(--shadow-glow)] animate-pulse"
                    : ""
                }`}
              >
                <RestaurantCard restaurant={r} />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Filtrlərə uyğun restoran tapılmadı.
          </div>
        )}
      </div>

      <Dialog
        open={!!picked}
        onOpenChange={(o) => {
          if (!o) {
            setPicked(null);
            setSpotlightId(undefined);
          }
        }}
      >
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto text-6xl mb-2 animate-bounce">🎲</div>
            <DialogTitle className="font-display text-2xl">
              Bu gün sənin seçimin
            </DialogTitle>
            <DialogDescription className="text-base">
              {picked && pickedMeta ? (
                <>
                  <span className="block text-2xl font-bold text-foreground mt-3">
                    {picked.name}
                  </span>
                  <span className="block mt-2 text-muted-foreground">
                    <span className="font-semibold text-primary">{pickedMeta.label}</span>
                    -dan sifariş ver!
                  </span>
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          {picked && pickedMeta && (
            <a
              href={pickedMeta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold py-3 px-6 hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            >
              Sifariş et — {pickedMeta.label}
              <ExternalLink className="size-4" />
            </a>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
