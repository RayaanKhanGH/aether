"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export default function CustomSelect({
  id,
  options,
  placeholder = "Select",
  value,
  onChange,
  required,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (opt: Option) => {
    setSelected(opt.value);
    onChange?.(opt.value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input for form validation */}
      <input
        type="text"
        id={id}
        value={selected}
        required={required}
        readOnly
        tabIndex={-1}
        className="absolute inset-0 opacity-0 pointer-events-none"
      />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          w-full px-4 py-3 bg-pure-white rounded-md border text-left text-sm
          flex items-center justify-between gap-3
          transition-all shadow-sm cursor-pointer
          ${isOpen
            ? "ring-2 ring-champagne-gold/40 border-champagne-gold/60"
            : "border-slate-gray/20 hover:border-slate-gray/40"
          }
          ${selected ? "text-obsidian" : "text-slate-gray/60"}
        `}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-gray transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute z-50 mt-2 w-full bg-pure-white rounded-lg border border-slate-gray/15
              shadow-lg shadow-obsidian/8 overflow-hidden
              max-h-60 overflow-y-auto
            "
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm flex items-center justify-between
                    transition-colors duration-150 cursor-pointer
                    ${selected === opt.value
                      ? "bg-alabaster text-obsidian font-medium"
                      : "text-slate-gray hover:bg-alabaster/60 hover:text-obsidian"
                    }
                  `}
                >
                  <span>{opt.label}</span>
                  {selected === opt.value && (
                    <Check size={15} className="text-champagne-gold shrink-0" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
