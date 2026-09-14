import { NextResponse } from "next/server"
import { CAUSES, type CauseId, type Charity } from "@/lib/charities"

const BASE = "https://partners.every.org/v0.2"

// Every.org browse cause slugs for each of our cause tags.
const CAUSE_SLUGS: Record<CauseId, string> = {
  environment: "environment",
  education: "education",
  healthcare: "health",
  hunger: "food",
  animals: "animals",
}

type EveryOrgNonprofit = {
  name?: string
  slug?: string
  ein?: string
  profileUrl?: string
  description?: string
  logoUrl?: string
  coverImageUrl?: string
  logoCloudinaryId?: string
}

function normalize(np: EveryOrgNonprofit, cause: CauseId): Charity | null {
  const slug = np.slug || np.ein
  if (!slug || !np.name) return null
  const profileUrl = np.profileUrl || `https://www.every.org/${slug}`
  return {
    id: slug,
    name: np.name,
    summary:
      np.description?.trim() ||
      "A verified nonprofit working to make a measurable impact in its community.",
    cause,
    logoUrl: np.logoUrl || null,
    profileUrl,
    donateUrl: `https://www.every.org/${slug}/donate`,
  }
}

async function everyOrgFetch(
  path: string,
  apiKey: string,
  take: number,
): Promise<EveryOrgNonprofit[]> {
  const url = `${BASE}/${path}?apiKey=${encodeURIComponent(apiKey)}&take=${take}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`Every.org responded ${res.status}`)
  const data = (await res.json()) as { nonprofits?: EveryOrgNonprofit[] }
  return data.nonprofits ?? []
}

function dedupe(charities: Charity[]): Charity[] {
  const seen = new Set<string>()
  return charities.filter((c) => {
    if (seen.has(c.id)) return false
    seen.add(c.id)
    return true
  })
}

export async function GET(request: Request) {
  const apiKey = process.env.EVERY_ORG_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim()
  const cause = searchParams.get("cause")?.trim() as CauseId | null

  try {
    // Live keyword search across all of Every.org.
    if (q) {
      const results = await everyOrgFetch(
        `search/${encodeURIComponent(q)}`,
        apiKey,
        24,
      )
      const charities = dedupe(
        results
          .map((np) => normalize(np, cause ?? "environment"))
          .filter((c): c is Charity => c !== null),
      )
      return NextResponse.json({ charities })
    }

    // Single cause tag selected: browse that cause.
    if (cause && CAUSE_SLUGS[cause]) {
      const results = await everyOrgFetch(
        `browse/${CAUSE_SLUGS[cause]}`,
        apiKey,
        24,
      )
      const charities = dedupe(
        results
          .map((np) => normalize(np, cause))
          .filter((c): c is Charity => c !== null),
      )
      return NextResponse.json({ charities })
    }

    // Default: a diverse mix across every cause, interleaved.
    const perCause = await Promise.all(
      CAUSES.map(async (c) => {
        try {
          const results = await everyOrgFetch(
            `browse/${CAUSE_SLUGS[c.id]}`,
            apiKey,
            6,
          )
          return results
            .map((np) => normalize(np, c.id))
            .filter((x): x is Charity => x !== null)
        } catch {
          return [] as Charity[]
        }
      }),
    )

    const interleaved: Charity[] = []
    const maxLen = Math.max(0, ...perCause.map((r) => r.length))
    for (let i = 0; i < maxLen; i++) {
      for (const list of perCause) {
        if (list[i]) interleaved.push(list[i])
      }
    }

    return NextResponse.json({ charities: dedupe(interleaved) })
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 })
  }
}
