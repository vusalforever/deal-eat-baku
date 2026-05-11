import { lazy, Suspense, useEffect, useState } from "react";
import type { Restaurant } from "@/data/restaurants";

const MapViewClient = lazy(() =>
  import("./MapViewClient").then((m) => ({ default: m.MapView }))
);

const Skeleton = () => (
  <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl border border-border bg-secondary animate-pulse" />
);

export function MapView(props: {
  activeId?: string;
  center?: [number, number];
  restaurants?: Restaurant[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton />;
  return (
    <Suspense fallback={<Skeleton />}>
      <MapViewClient {...props} />
    </Suspense>
  );
}
