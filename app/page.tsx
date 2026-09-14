"use client"

import { useMemo, useState } from "react"
import { SearchX } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CharityCard } from "@/components/charity-card"
import { DonationModal } from "@/components/donation-modal"
import { CHARITIES, type CauseId, type Charity } from "@/lib/charities"

export default function Page() {
  const [query, setQuery] = useState("")
  const [activeCause, setActiveCause] = useState<CauseId | null>(null)
  const [selected, setSelected] = useState<Charity | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CHARITIES.filter((c) => {
      const matchesCause = !activeCause || c.cause === activeCause
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.cause.toLowerCase().includes(q)
      return matchesCause && matchesQuery
    })
  }, [query, activeCause])

  return (
    <div className="min-h-screen bg-background">
      <Navbar query={query} onQueryChange={setQuery} />
      <main>
        <Hero
          activeCause={activeCause}
          onCauseToggle={(cause) =>
            setActiveCause((prev) => (prev === cause ? null : cause))
          }
        />

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "cause" : "causes"}
            </p>
            {(activeCause || query) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCause(null)
                  setQuery("")
                }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((charity) => (
                <CharityCard
                  key={charity.id}
                  charity={charity}
                  onDonate={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <SearchX className="size-10 text-muted-foreground" />
              <p className="mt-4 font-semibold text-foreground">
                No causes found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or category.
              </p>
            </div>
          )}
        </section>
      </main>

      <DonationModal charity={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
