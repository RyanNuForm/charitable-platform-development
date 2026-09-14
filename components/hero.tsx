"use client"

import { CAUSES, type CauseId } from "@/lib/charities"

export function Hero({
  activeCause,
  onCauseToggle,
}: {
  activeCause: CauseId | null
  onCauseToggle: (cause: CauseId) => void
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-6 pt-12 text-center sm:px-6 sm:pt-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        0% platform fees, always
      </span>

      <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Donate Direct.{" "}
        <span className="text-primary">No Hidden Fees.</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
        Discover vetted global causes and give with confidence. Every dollar you
        pledge is routed straight to the verified official portal.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
        {CAUSES.map((cause) => {
          const active = activeCause === cause.id
          return (
            <button
              key={cause.id}
              type="button"
              onClick={() => onCauseToggle(cause.id)}
              aria-pressed={active}
              className={
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent")
              }
            >
              <span aria-hidden>{cause.emoji}</span>
              {cause.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
