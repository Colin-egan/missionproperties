// One-off migration: seeds Supabase `projects` table + `project-media` bucket
// from the site's existing static data and local image folders.
//
// Usage: node --env-file=.env.migrate scripts/migrate-projects.mjs
// (.env.migrate should hold SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MISSION_PROPERTIES_CLIENT_ID
//  — kept out of .env.local since the service-role key should never ship to the browser/build.)

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { completedProjects } from "./completed-projects-data.mjs";
import { currentProjectsRaw } from "./current-projects-data.mjs";

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
const BUCKET = "project-media";
const REPO_ROOT = path.resolve(import.meta.dirname, "..");

const currentProjectsClsToFile = {
  "proj-img-1": "Evermore.webp",
  "proj-img-2": "The+Venue+Exterior+1.webp",
  "proj-img-3": "bowerywest.webp",
  "proj-img-4": "Christenbury+Exterior.webp",
  "proj-img-5": "The+Halcyon+Exterior+2.webp",
  "proj-img-6": "Hamilton+Reserve+Exterior.webp",
};

async function uploadImage(localFilePath, storagePath) {
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

async function migrateCompleted() {
  console.log(`Migrating ${completedProjects.length} completed projects...`);
  for (const [i, proj] of completedProjects.entries()) {
    console.log(`- ${proj.name} (${proj.images.length} images)`);
    const imageUrls = [];
    for (const filename of proj.images) {
      const localPath = path.join(
        REPO_ROOT,
        "public/images/completed-projects",
        proj.slug,
        filename
      );
      const storagePath = `${clientId}/${proj.slug}/${filename}`;
      const url = await uploadImage(localPath, storagePath);
      if (url) imageUrls.push(url);
    }

    const heroIndex = proj.images.indexOf(proj.heroImage);
    const heroUrl = heroIndex >= 0 ? imageUrls[heroIndex] : imageUrls[0];

    const { error } = await supabase.from("projects").upsert(
      {
        client_id: clientId,
        slug: proj.slug,
        status: "completed",
        name: proj.name,
        location: proj.location,
        address: proj.address,
        units: proj.units ?? null,
        unit_types: proj.unitTypes ?? null,
        square_footage: proj.squareFootage ?? null,
        year_completed: proj.yearCompleted ?? null,
        description: proj.description ?? null,
        amenities: proj.amenities ?? null,
        features: proj.features ?? null,
        hero_image: heroUrl ?? null,
        images: imageUrls,
        sort_order: i,
      },
      { onConflict: "client_id,slug" }
    );
    if (error) console.warn(`  ! db upsert failed: ${error.message}`);
  }
}

async function migrateCurrent() {
  console.log(`Migrating ${currentProjectsRaw.length} current projects...`);
  for (const [i, proj] of currentProjectsRaw.entries()) {
    const filename = currentProjectsClsToFile[proj.cls];
    console.log(`- ${proj.name} (${filename})`);
    const localPath = path.join(REPO_ROOT, "public/images/current-projects", filename);
    const storagePath = `${clientId}/${proj.slug}/${filename}`;
    const heroUrl = await uploadImage(localPath, storagePath);

    const { error } = await supabase.from("projects").upsert(
      {
        client_id: clientId,
        slug: proj.slug,
        status: "current",
        name: proj.name,
        location: proj.location,
        units: proj.units ? String(proj.units) : null,
        description: proj.description,
        hero_image: heroUrl,
        images: heroUrl ? [heroUrl] : [],
        sort_order: i,
      },
      { onConflict: "client_id,slug" }
    );
    if (error) console.warn(`  ! db upsert failed: ${error.message}`);
  }
}

await migrateCompleted();
await migrateCurrent();
console.log("Migration complete.");
