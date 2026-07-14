import { supabase, CLIENT_ID } from "@/lib/supabase"

export interface TeamMember {
  slug: string
  name: string
  title: string
  photo: string
  initials: string
  bio: string[]
  education: string[]
  personal: string
}

type TeamMemberRow = {
  slug: string
  name: string
  title: string | null
  photo: string | null
  bio: string[] | null
  education: string[] | null
  personal: string | null
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function toTeamMember(row: TeamMemberRow): TeamMember {
  return {
    slug: row.slug,
    name: row.name,
    title: row.title ?? "",
    photo: row.photo ?? "",
    initials: initialsOf(row.name),
    bio: row.bio ?? [],
    education: row.education ?? [],
    personal: row.personal ?? "",
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("slug, name, title, photo, bio, education, personal")
    .eq("client_id", CLIENT_ID)
    .order("sort_order", { ascending: true })

  if (error || !data) return []

  return data.map((row) => toTeamMember(row as TeamMemberRow))
}
