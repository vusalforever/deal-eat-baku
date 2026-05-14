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

const BAKU_CENTER: [number, number] = [40.3777, 49.892];

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

function distanceKm(a: [number, number], b: [number, number]) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export function MapView({
  activeId,
  center,
  restaurants = allRestaurants,
  fullScreen = false,
  onSelect,
}: {
  activeId?: string;
  center?: [number, number];
  restaurants?: Restaurant[];
  fullScreen?: boolean;
  onSelect?: (r: Restaurant) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mapCenter: [number, number] = center ?? BAKU_CENTER;

  const wrapperClass = fullScreen
    ? "absolute inset-0 overflow-hidden"
    : "relative w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-card)]";

  if (!mounted) {
    return (
      <div
        className={
          fullScreen
            ? "absolute inset-0 bg-secondary animate-pulse"
            : "w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl border border-border bg-secondary animate-pulse"
        }
      />
    );
  }

  return (
    <div className={wrapperClass}>
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
          const cheapest = cheapestPlatform(r.fees);
          const emoji = categoryEmoji[r.categories[0]] ?? "🍽️";
          const meta = cheapest ? platformMeta[cheapest] : null;
          const cheapestFee = cheapest ? r.fees[cheapest]! : 0;
          const dist = center ? distanceKm(center, r.latlng) : null;

          return (
            <Marker
              key={r.id}
              position={r.latlng}
              icon={emojiIcon(emoji, r.id === activeId)}
            >
              <Popup className="deal-popup" closeButton maxWidth={300} minWidth={260}>
                <div className="w-[260px] p-1">
                  <div className="flex items-start gap-2 mb-2 pr-5">
                    <span className="text-2xl leading-none">{emoji}</span>
                    <h3 className="font-bold text-base leading-tight text-gray-900 m-0">
                      {r.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 flex-wrap">
                    <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 font-semibold px-2 py-0.5">
                      {r.categories[0]}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      ⭐ <span className="font-medium">{r.rating}</span>
                    </span>
                    {dist != null && (
                      <span className="inline-flex items-center gap-0.5">
                        📍 <span className="font-medium">{dist.toFixed(1)} km</span>
                      </span>
                    )}
                  </div>

                  {meta && (
                    <div className="mb-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full text-white text-xs font-semibold px-2.5 py-1"
                        style={{ backgroundColor: meta.color }}
                      >
                        ✅ {meta.label}
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-gray-700 m-0 mb-3">
                    <span className="font-bold text-gray-900">
                      {cheapestFee.toFixed(2)} AZN
                    </span>
                    -dən başlayır
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelect?.(r)}
                    className="block w-full text-center rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 transition shadow-md"
                  >
                    Menyunu gör →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
