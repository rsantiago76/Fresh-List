import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'motion/react';

type Item = { 
  name: string; 
  category: string;
  quality: 'fresh' | 'moderate' | 'processed';
};

interface AutocompleteProps {
  value: string;
  onChange: (v: string) => void;
  onSelect: (item: Item) => void;
  items: Item[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Autocomplete({
  value,
  onChange,
  onSelect,
  items,
  placeholder = "Add grocery item…",
  className = "",
  autoFocus = false,
  onKeyDown,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["name", "category"],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items]
  );

  const results = useMemo(() => {
    const q = value.trim();
    if (q.length < 2) return [];
    return fuse.search(q).slice(0, 8).map((r) => r.item);
  }, [value, fuse]);

  useEffect(() => {
    setOpen(results.length > 0);
    setActive(0);
  }, [results.length]);

  function choose(item: Item) {
    onSelect(item);
    setOpen(false);
  }

  // Quality badge colors
  const getQualityColor = (quality: Item['quality']) => {
    switch (quality) {
      case 'fresh':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'moderate':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'processed':
        return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  const getQualityLabel = (quality: Item['quality']) => {
    switch (quality) {
      case 'fresh':
        return '🥬 Fresh';
      case 'moderate':
        return '🍞 Lightly Processed';
      case 'processed':
        return '🍪 Ultra-Processed';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-12 w-full rounded-xl border-2 border-[var(--neutral-200)] bg-white px-4 text-base 
        transition-all duration-250 outline-none
        focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100
        hover:border-[var(--neutral-300)]"
        onFocus={() => setOpen(results.length > 0)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          // Call parent onKeyDown first
          if (onKeyDown && !open) {
            onKeyDown(e);
            return;
          }

          if (!open) return;
          
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            const pick = results[active];
            if (pick) choose(pick);
          } else if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
          }
        }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border-2 border-[var(--neutral-200)] bg-white shadow-xl"
          >
            <div className="max-h-80 overflow-y-auto">
              {results.map((r, idx) => (
                <button
                  key={`${r.name}-${idx}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(r)}
                  onMouseEnter={() => setActive(idx)}
                  className={`
                    flex w-full items-center justify-between px-4 py-3 text-left transition-all duration-150
                    ${idx === active 
                      ? 'bg-gradient-to-r from-emerald-50 to-lime-50 border-l-4 border-emerald-500' 
                      : 'hover:bg-slate-50 border-l-4 border-transparent'
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 mb-1">
                      {r.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {r.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getQualityColor(r.quality)}`}>
                        {getQualityLabel(r.quality)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer hint */}
            <div className="border-t border-[var(--neutral-200)] bg-slate-50 px-4 py-2">
              <p className="text-xs text-slate-500 text-center">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs">↑↓</kbd> Navigate
                <kbd className="ml-2 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs">Enter</kbd> Select
                <kbd className="ml-2 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs">Esc</kbd> Close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
