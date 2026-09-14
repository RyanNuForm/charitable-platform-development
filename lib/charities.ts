export type CauseId =
  | "environment"
  | "education"
  | "healthcare"
  | "hunger"
  | "animals"

export type Cause = {
  id: CauseId
  label: string
  emoji: string
}

export const CAUSES: Cause[] = [
  { id: "environment", label: "Environment", emoji: "🌱" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "healthcare", label: "Healthcare", emoji: "🏥" },
  { id: "hunger", label: "Hunger Relief", emoji: "🍲" },
  { id: "animals", label: "Animal Welfare", emoji: "🐾" },
]

// A charity normalized from the live Every.org API.
export type Charity = {
  id: string
  name: string
  summary: string
  cause: CauseId
  logoUrl: string | null
  profileUrl: string
  donateUrl: string
}
