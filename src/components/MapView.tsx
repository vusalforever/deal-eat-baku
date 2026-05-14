import { lazy, Suspense, useEffect, useState } from "react";
import type { Restaurant } from "@/data/restaurants";

const MapViewClient = lazy(() =>
  import("./MapViewClient").then((m) => ({ default: m.MapView }))
);

export function MapView(props: {
  activeId?: string;
  center?: [number, number];
  restaurants?: Restaurant[];
  fullScreen?: boolean;
  onSelect?: (r: Restaurant) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const Skeleton = () =>
    props.fullScreen ? (
      <div className="absolute inset-0 bg-secondary animate-pulse" />
    ) : (
      <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-3xl border border-border bg-secondary animate-pulse" />
    );
  if (!mounted) return <Skeleton />;
  return (
    <Suspense fallback={<Skeleton />}>
      <MapViewClient {...props} />
    </Suspense>
  );
}
