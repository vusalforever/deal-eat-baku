import { useNavigate } from "@tanstack/react-router";
import { categories, type CategoryKey } from "@/data/restaurants";

export function CategoryBar({
  active,
  onSelect,
}: {
  active?: CategoryKey;
  onSelect?: (key: CategoryKey | undefined) => void;
}) {
  const navigate = useNavigate();

  const handle = (key: CategoryKey) => {
    const next = active === key ? undefined : key;
    if (onSelect) {
      onSelect(next);
    } else {
      navigate({ to: "/restaurants", search: next ? { category: next } : {} });
    }
  };

  return (
    <div className="border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none -mx-1 px-1">
          {categories.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => handle(c.key)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                <span className="text-base leading-none">{c.emoji}</span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
