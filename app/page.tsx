"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { AlertCircle, Loader2, SearchX } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CharityCard } from "@/components/charity-card"
import { DonationModal } from "@/components/donation-modal"
import { type CauseId, type Charity } from "@/lib/charities"
import { type CurrencyCode } from "@/lib/currency"

type ApiResponse = { charities?: Charity[]; error?: string }

const fetcher = async (url: string): Promise<ApiResponse> => {
  const res = await fetch(url)
  const data = (await res.json()) as ApiResponse
  if (!res.ok) {
    const err = new Error(data.error || "request_failed") as Error & {
      status?: number
    }
    err.status = res.status
    throw err
  }
  return data
}

export default function Page() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [activeCause, setActiveCause] = useState<CauseId | null>(null)
  const [selected, setSelected] = useState<Charity | null>(null)
  const [currency, setCurrency] = useState<CurrencyCode>("USD")

  // Debounce the search box so we call the API only after typing settles.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 350)
    return () => clearTimeout(t)
  }, [query])

  const params = new URLSearchParams()
  if (debouncedQuery) params.set("q", debouncedQuery)
  if (activeCause) params.set("cause", activeCause)
  const key = `/api/charities${params.toString() ? `?${params.toString()}` : ""}`

  const { data, error, isLoading } = useSWR<ApiResponse>(key, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  const charities = data?.charities ?? []
  const missingKey =
    (error as (Error & { status?: number }) | undefined)?.status === 503

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
      />
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
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin" />
                  Searching live charities...
                </span>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {charities.length}
                  </span>{" "}
                  live {charities.length === 1 ? "cause" : "causes"}
                </>
              )}
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

          {missingKey ? (
            <StateBlock
              icon={<AlertCircle className="size-10 text-muted-foreground" />}
              title="Every.org API key required"
              body="Add EVERY_ORG_API_KEY to your project to load live nonprofit data."
            />
          ) : error ? (
            <StateBlock
              icon={<AlertCircle className="size-10 text-muted-foreground" />}
              title="Could not reach Every.org"
              body="The live charity service is temporarily unavailable. Please try again."
            />
          ) : charities.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {charities.map((charity) => (
                <CharityCard
                  key={charity.id}
                  charity={charity}
                  onDonate={setSelected}
                />
              ))}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-52 animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          ) : (
            <StateBlock
              icon={<SearchX className="size-10 text-muted-foreground" />}
              title="No causes found"
              body="Try a different keyword or category."
            />
          )}
        </section>
      </main>

      <DonationModal
        charity={selected}
        currency={currency}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}

function StateBlock({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
      {icon}
      <p className="mt-4 font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
    </div>
  )
}
