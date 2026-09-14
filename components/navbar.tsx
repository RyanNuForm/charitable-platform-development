"use client"

import { ChevronDown, Heart, Search, User } from "lucide-react"
import { CURRENCIES, type CurrencyCode } from "@/lib/currency"

export function Navbar({
  query,
  onQueryChange,
  currency,
  onCurrencyChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  currency: CurrencyCode
  onCurrencyChange: (value: CurrencyCode) => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Heart className="size-4 fill-current" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Charitable
          </span>
        </a>

        <div className="relative mx-auto w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search causes or charities..."
            aria-label="Search charities"
            className="w-full rounded-full border border-input bg-secondary/60 py-2 pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
            aria-label="Select currency"
            className="cursor-pointer appearance-none rounded-full border border-input bg-secondary/60 py-2 pl-3.5 pr-8 text-sm font-medium text-foreground outline-none transition hover:bg-secondary focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <button
          type="button"
          aria-label="User profile"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          <User className="size-5" />
        </button>
      </div>
    </header>
  )
}
