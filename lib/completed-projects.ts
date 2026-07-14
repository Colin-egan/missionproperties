import { supabase, CLIENT_ID } from "@/lib/supabase"

export interface CompletedProject {
  slug: string
  name: string
  location: string
  address: string
  heroImage: string
  images: string[]
  units?: string
  unitTypes?: string
  squareFootage?: string
  yearCompleted?: string
  description?: string
  amenities?: string[]
  features?: string[]
}

type ProjectRow = {
  slug: string
  name: string
  location: string | null
  address: string | null
  hero_image: string | null
  images: string[]
  units: string | null
  unit_types: string | null
  square_footage: string | null
  year_completed: string | null
  description: string | null
  amenities: string[] | null
  features: string[] | null
}

function toCompletedProject(row: ProjectRow): CompletedProject {
  return {
    slug: row.slug,
    name: row.name,
    location: row.location ?? "",
    address: row.address ?? "",
    heroImage: row.hero_image ?? row.images[0] ?? "",
    images: row.images,
    units: row.units ?? undefined,
    unitTypes: row.unit_types ?? undefined,
    squareFootage: row.square_footage ?? undefined,
    yearCompleted: row.year_completed ?? undefined,
    description: row.description ?? undefined,
    amenities: row.amenities ?? undefined,
    features: row.features ?? undefined,
  }
}

async function getProjectsByStatus(status: "completed" | "current"): Promise<CompletedProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug, name, location, address, hero_image, images, units, unit_types, square_footage, year_completed, description, amenities, features"
    )
    .eq("client_id", CLIENT_ID)
    .eq("status", status)
    .order("sort_order", { ascending: true })

  if (error || !data) return []

  return data.map((row) => toCompletedProject(row as ProjectRow))
}

export async function getCompletedProjects(): Promise<CompletedProject[]> {
  return getProjectsByStatus("completed")
}

export async function getCurrentProjects(): Promise<CompletedProject[]> {
  return getProjectsByStatus("current")
}
