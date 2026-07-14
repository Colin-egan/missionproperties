import { createClient } from "@supabase/supabase-js"

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars")
}

export const supabase = createClient(url, anonKey)

export const CLIENT_ID = process.env.MISSION_PROPERTIES_CLIENT_ID

if (!CLIENT_ID) {
  throw new Error("Missing MISSION_PROPERTIES_CLIENT_ID env var")
}
