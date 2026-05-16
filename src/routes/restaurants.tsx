import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, LocateFixed, Loader2, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import { RestaurantSheet } from "@/components/RestaurantSheet";
import {
  restaurants,
  type CategoryKey,
  type Restaurant,
} from "@/data/restaurants";

type MapSearch = { category?: CategoryKey; address?: string };

export const Route = createFileRoute("/restaurants")({
  validateSearch: (search: Record<string, unknown>): MapSearch => ({
    category:
      typeof search.category === "string"
        ? (search.category as CategoryKey)
        : undefined,
    address: typeof search.address === "string" ? search.address : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Map — DealEat Baku" },
      {
        name: "description",
        content:
          "Find restaurants in Baku on an interactive map and compare prices.",
      },
    ],
  }),
  component: MapPage,
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

function MapPage() {
  const { address: addrParam } = Route.useSearch();
  const [address, setAddress] = useState(addrParam ?? "Baku, Nasimi");
  const [draft, setDraft] = useState(address);
  const [editing, setEditing] = useState(false);
  const [center, setCenter] = useState<[number, number] | undefined>();
  const [locating, setLocating] = useState(false);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const handleSubmit = async (q: string) => {
    const result = await geocodeBaku(q);
    if (result) {
      setCenter(result);
      setAddress(q);
      setEditing(false);
      toast.success(`Location found: ${q}`);
    } else {
      toast.error("Location not found. Try a different name.");
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      toast.error("Your browser doesn't support GPS.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setAddress("My location");
        setEditing(false);
        setLocating(false);
        toast.success("Location found");
      },
      () => {
        setLocating(false);
        toast.error("Could not get your location.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (addrParam) handleSubmit(addrParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addrParam]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />

      <div className="relative flex-1">
        <MapView
          center={center}
          restaurants={restaurants}
          fullScreen
          onSelect={(r) => setSelected(r)}
        />

        {/* Floating address bar overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-wrap items-center justify-center gap-2 px-3 w-full max-w-lg">
          {!editing ? (
            <button
              type="button"
              onClick={() => {
                setDraft(address);
                setEditing(true);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card pl-4 pr-3 py-2 text-sm font-medium shadow-[var(--shadow-elevated)] hover:border-primary/40 transition"
            >
              <MapPin className="size-4 text-primary" />
              <span className="truncate max-w-[35vw] sm:max-w-[50vw]">{address}</span>
              <span className="grid place-items-center size-6 rounded-full bg-secondary text-muted-foreground">
                <Pencil className="size-3" />
              </span>
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) handleSubmit(draft.trim());
              }}
              className="flex items-center gap-2 rounded-full border border-primary/60 bg-card pl-4 pr-1 py-1 shadow-[var(--shadow-glow)]"
            >
              <MapPin className="size-4 text-primary shrink-0" />
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Yasamal, Nasimi, 28 May..."
                className="bg-transparent outline-none text-sm py-1.5 w-28 sm:w-48 min-w-0"
              />
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="grid place-items-center size-7 rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X className="size-4" />
              </button>
              <button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5"
              >
                Search
              </button>
            </form>
          )}
          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium shadow-[var(--shadow-elevated)] hover:border-primary/40 transition disabled:opacity-60"
          >
            {locating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LocateFixed className="size-4" />
            )}
            My Location
          </button>
        </div>
      </div>

      {selected && (
        <RestaurantSheet
          restaurant={selected}
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(null)}
        />
      )}
    </div>
  );
}
