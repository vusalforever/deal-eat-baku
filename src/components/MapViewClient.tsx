import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  restaurants as allRestaurants,
  type Restaurant,
  categoryEmoji,
  platformMeta,
  cheapestPlatform,
} from "@/data/restaurants";

const BAKU_CENTER: [number, number] = [40.3777, 49.8920];

function emojiIcon(emoji: string, active = false) {
  return L.divIcon({
    className: "deal-emoji-pin",
    html: `<div class="${
      active ? "ring-2 ring-primary scale-110" : ""
    } size-10 rounded-full bg-background border-2 border-primary shadow-lg grid place-items-center text-xl transition-transform hover:scale-110">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

function userIcon() {
  return L.divIcon({
    className: "deal-user-pin",
    html: `<div class="relative"><div class="absolute -inset-3 rounded-full bg-primary/30 animate-ping"></div><div class="size-4 rounded-full bg-primary border-[3px] border-background shadow-lg"></div></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, Math.max(map.getZoom(), 14), { animate: true });
  }, [center, map]);
  return null;
}

export function MapView({
  activeId,
  center,
  restaurants = allRestaurants,
}: {
  activeId?: string;
  center?: [number, number];
  restaurants?: Restaurant[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mapCenter: [number, number] = center ?? BAKU_CENTER;

  if (!mounted) {
    return (
      <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl border border-border bg-secondary animate-pulse" />
    );
  }

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", background: "#1a1a1a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Recenter center={mapCenter} />

        {/* User location */}
        {center && (
          <>
            <Marker position={center} icon={userIcon()} />
            <CircleMarker
              center={center}
              radius={60}
              pathOptions={{
                color: "var(--primary)",
                fillColor: "var(--primary)",
                fillOpacity: 0.08,
                weight: 1,
              }}
            />
          </>
        )}

        {restaurants.map((r) => {
          const cheapest = cheapestPlatform(r.popularPrice);
          const emoji = categoryEmoji[r.categories[0]] ?? "🍽️";
          const cheapestUrl = cheapest ? platformMeta[cheapest].url : "#";
          return (
            <Marker
              key={r.id}
              position={r.latlng}
              icon={emojiIcon(emoji, r.id === activeId)}
            >
              <Popup>
                <div className="min-w-[220px] space-y-2">
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.tagline} · {r.deliveryMin} dəq
                    </div>
                  </div>
                  <div className="space-y-1">
                    {(["wolt", "bolt", "yango"] as const).map((p) => {
                      const price = r.popularPrice[p];
                      if (price == null) return null;
                      const isCheap = p === cheapest;
                      return (
                        <div
                          key={p}
                          className={`flex items-center justify-between rounded-md px-2 py-1 text-xs ${
                            isCheap
                              ? "bg-success/10 border border-success/40"
                              : "bg-secondary"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: platformMeta[p].color }}
                            />
                            {platformMeta[p].label}
                          </span>
                          <span className="font-semibold tabular-nums">
                            {price.toFixed(2)} AZN {isCheap && "✅"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <a
                    href={cheapestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full rounded-md bg-primary text-primary-foreground text-xs font-semibold py-1.5 hover:opacity-90"
                  >
                    Sifariş et →
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
