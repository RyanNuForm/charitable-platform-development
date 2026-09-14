"use client"

import { HeartHandshake, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CAUSES, type Charity } from "@/lib/charities"

export function CharityCard({
  charity,
  onDonate,
}: {
  charity: Charity
  onDonate: (charity: Charity) => void
}) {
  const cause = CAUSES.find((c) => c.id === charity.cause)

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
          <span aria-hidden>{cause?.emoji}</span>
          {cause?.label}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
          title="Impact Score"
        >
          <Star className="size-3 fill-current" />
          {charity.impactScore}/100 Rating
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-foreground">{charity.name}</h3>
      <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {charity.summary}
      </p>

      <Button
        onClick={() => onDonate(charity)}
        className="mt-5 w-full gap-2 rounded-xl font-semibold"
      >
        <HeartHandshake className="size-4" />
        Donate Directly
      </Button>
    </article>
  )
}
