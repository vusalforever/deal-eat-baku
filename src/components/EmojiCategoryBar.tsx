import { categories, type CategoryKey } from "@/data/restaurants";

export function EmojiCategoryBar({
  active,
  onSelect,
}: {
  active?: CategoryKey;
  onSelect: (key: CategoryKey | undefined) => void;
}) {
  return (
    <div
      className="flex gap-4 overflow-x-auto py-2 px-1 -mx-1"
      style={{ scrollbarWidth: "none" }}
    >
      {categories.map((c) => {
        const isActive = active === c.key;
        return (
          <button
            key={c.key}
            onClick={() => onSelect(isActive ? undefined : c.key)}
            className="shrink-0 flex flex-col items-center gap-1.5 group"
          >
            <span
              className={`grid place-items-center size-16 rounded-full text-3xl transition-all ${c.bg} ${
                isActive
                  ? "ring-4 ring-primary scale-105 shadow-[var(--shadow-glow)]"
                  : "ring-2 ring-transparent group-hover:ring-primary/30 group-hover:scale-105"
              }`}
            >
              {c.emoji}
            </span>
            <span
              className={`text-xs font-medium transition ${
                isActive ? "text-primary" : "text-foreground"
              }`}
            >
              {c.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
