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

export type Charity = {
  id: string
  name: string
  summary: string
  cause: CauseId
  impactScore: number
  url: string
}

export const CHARITIES: Charity[] = [
  {
    id: "rainforest-trust",
    name: "Rainforest Trust",
    summary:
      "Protects the most threatened tropical forests by purchasing and safeguarding at-risk land across the globe.",
    cause: "environment",
    impactScore: 96,
    url: "https://www.rainforesttrust.org",
  },
  {
    id: "ocean-conservancy",
    name: "Ocean Conservancy",
    summary:
      "Works to protect the ocean from today's greatest global challenges, removing millions of pounds of trash from coastlines.",
    cause: "environment",
    impactScore: 91,
    url: "https://oceanconservancy.org",
  },
  {
    id: "room-to-read",
    name: "Room to Read",
    summary:
      "Transforms the lives of millions of children in low-income communities through literacy and girls' education programs.",
    cause: "education",
    impactScore: 95,
    url: "https://www.roomtoread.org",
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    summary:
      "Provides free, world-class education for anyone, anywhere, with lessons across math, science, and the humanities.",
    cause: "education",
    impactScore: 93,
    url: "https://www.khanacademy.org",
  },
  {
    id: "doctors-without-borders",
    name: "Doctors Without Borders",
    summary:
      "Delivers emergency medical care to people affected by conflict, epidemics, and disasters in over 70 countries.",
    cause: "healthcare",
    impactScore: 98,
    url: "https://www.doctorswithoutborders.org",
  },
  {
    id: "partners-in-health",
    name: "Partners In Health",
    summary:
      "Brings modern medical science to those most in need, building lasting health systems in underserved communities.",
    cause: "healthcare",
    impactScore: 94,
    url: "https://www.pih.org",
  },
  {
    id: "world-food-programme",
    name: "World Food Programme",
    summary:
      "The world's largest humanitarian organization fighting hunger, delivering food assistance in emergencies worldwide.",
    cause: "hunger",
    impactScore: 97,
    url: "https://www.wfp.org",
  },
  {
    id: "feeding-america",
    name: "Feeding America",
    summary:
      "Fights hunger nationwide through a network of food banks, providing billions of meals to families in need.",
    cause: "hunger",
    impactScore: 90,
    url: "https://www.feedingamerica.org",
  },
  {
    id: "world-wildlife-fund",
    name: "World Wildlife Fund",
    summary:
      "Conserves nature and reduces the most pressing threats to the diversity of life on Earth and endangered species.",
    cause: "animals",
    impactScore: 92,
    url: "https://www.worldwildlife.org",
  },
  {
    id: "aspca",
    name: "ASPCA",
    summary:
      "Rescues animals from abuse, passes humane laws, and shares resources with shelters to protect animals nationwide.",
    cause: "animals",
    impactScore: 89,
    url: "https://www.aspca.org",
  },
]
