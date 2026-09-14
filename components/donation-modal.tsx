"use client"

import { useEffect } from "react"
import { ExternalLink, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Charity } from "@/lib/charities"

export function DonationModal({
  charity,
  onClose,
}: {
  charity: Charity | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!charity) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [charity, onClose])

  if (!charity) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-title"
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="size-6" />
        </div>

        <h2
          id="donation-title"
          className="mt-4 text-xl font-bold text-foreground"
        >
          100% Direct Transaction
        </h2>

        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Charitable charges a{" "}
          <span className="font-semibold text-primary">0% platform fee</span>.
          You are being securely routed directly to the verified official portal
          for{" "}
          <span className="font-semibold text-foreground">{charity.name}</span>.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
          <Button
            className="flex-1 gap-2 rounded-xl font-semibold"
            onClick={() => {
              window.open(charity.url, "_blank", "noopener,noreferrer")
              onClose()
            }}
          >
            Proceed to Official Donation Page
            <ExternalLink className="size-4" />
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl font-semibold sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
