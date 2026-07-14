// One-off migration: seeds Supabase `team_members` table + `team-media` bucket
// from the site's previously-hardcoded team data and local headshot images.
//
// Usage: node --env-file=.env.migrate scripts/migrate-team.mjs
// (.env.migrate should hold SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MISSION_PROPERTIES_CLIENT_ID
//  — kept out of .env.local since the service-role key should never ship to the browser/build.)

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const clientId = process.env.MISSION_PROPERTIES_CLIENT_ID;

if (!url || !serviceRoleKey || !clientId) {
  console.error(
    "Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or MISSION_PROPERTIES_CLIENT_ID env vars."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
const BUCKET = "team-media";
const REPO_ROOT = path.resolve(import.meta.dirname, "..");

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const team = [
  {
    name: "Jason McArthur",
    title: "Founder / Principal",
    photoFile: "jason-mcarthur.webp",
    bio: [
      "Jason brings over 30 years of multifamily development experience across the Southeastern United States, with more than $2.5 billion in apartment projects developed throughout his career.",
      "He began his career at Gables Residential Trust before founding the South Florida division of Wood Partners, growing the division from a one-man operation to a team of more than 20 professionals.",
      "Jason returned to the Carolinas in 2007 and founded Mission Properties, which has since completed 40+ projects comprising over 5,000 rental units valued at more than $1 billion.",
    ],
    education: [
      "B.A. — University of North Carolina at Chapel Hill",
      "MBA — UNC Kenan-Flagler Business School",
    ],
    personal: "Resides in Charlotte with his wife Jennifer and their five children.",
  },
  {
    name: "Tom Egan",
    title: "Development Manager",
    photoFile: "tom-egan.webp",
    bio: [
      "Tom has spent 8+ years with Mission Properties, overseeing 20 projects representing approximately 2,500 units and $425 million in total project value.",
      "His role spans all phases of project execution — managing schedules, billing, and consultant teams from pre-development through delivery. He previously worked at David Furman Architecture and Andrew Roby General Contractors, giving him a uniquely holistic view of the development process.",
      "Tom has served as Chairperson of both the Charlotte Historic District Commission and the Charlotte-Mecklenburg Historic Landmarks Commission.",
    ],
    education: ["B.A., Architectural Design — Clemson University"],
    personal: "Resides in Wilmington, NC with his wife Nancy and three children.",
  },
  {
    name: "Tara Bechstein",
    title: "Accounting",
    photoFile: "tara-bechstein.webp",
    bio: [
      "Tara brings 17+ years of public accounting experience to Mission Properties, where she has served since April 2021.",
      "She began her career at Grant Thornton in Charlotte before joining a local accounting firm, developing deep expertise in real estate and construction accounting.",
    ],
    education: [
      "B.S., Business Administration (Accounting) — Bowling Green State University",
      "Masters of Accountancy — Bowling Green State University",
      "Licensed CPA — State of North Carolina",
    ],
    personal: "Originally from Ohio; resides in Charlotte with her husband Drew and two sons.",
  },
  {
    name: "Jennifer McArthur",
    title: "Administrative / Accounting",
    photoFile: "jennifer-mcarthur.webp",
    bio: [
      "Jennifer has provided administrative and accounting services to Mission Properties since 2013, playing a foundational role in the firm's back-office operations.",
      "Prior to Mission Properties, she gained experience in fundraising at Brookstone Schools and Duke University, as well as roles in human resources and IT.",
    ],
    education: ["B.A., Political Science — Vanderbilt University (1995)"],
    personal: "Married to founder Jason McArthur since 1998; mother of five.",
  },
];

async function uploadPhoto(localFilePath, storagePath) {
  const fileBuffer = await readFile(localFilePath);
  const ext = path.extname(localFilePath).slice(1).toLowerCase();
  const contentType =
    { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" }[ext] ||
    "application/octet-stream";

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, fileBuffer, {
    contentType,
    upsert: true,
  });
  if (error) {
    console.warn(`  ! upload failed for ${localFilePath}: ${error.message}`);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function migrateTeam() {
  console.log(`Migrating ${team.length} team members...`);
  for (const [i, member] of team.entries()) {
    const slug = slugify(member.name);
    console.log(`- ${member.name}`);

    const localPath = path.join(REPO_ROOT, "public/images/team", member.photoFile);
    const storagePath = `${clientId}/${slug}/${member.photoFile}`;
    const photoUrl = await uploadPhoto(localPath, storagePath);

    const { error } = await supabase.from("team_members").upsert(
      {
        client_id: clientId,
        slug,
        name: member.name,
        title: member.title,
        photo: photoUrl,
        bio: member.bio,
        education: member.education,
        personal: member.personal,
        sort_order: i,
      },
      { onConflict: "client_id,slug" }
    );
    if (error) console.warn(`  ! db upsert failed: ${error.message}`);
  }
}

await migrateTeam();
console.log("Migration complete.");
