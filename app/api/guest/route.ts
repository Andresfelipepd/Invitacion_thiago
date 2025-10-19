// app/api/guest/route.ts
import { NextResponse } from "next/server";

const AIRTABLE_BASE = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME!;
const AIRTABLE_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(
  AIRTABLE_TABLE
)}`;

if (!AIRTABLE_BASE || !AIRTABLE_TABLE || !AIRTABLE_KEY) {
  console.warn(
    "Airtable env vars missing. Set AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME and AIRTABLE_API_KEY"
  );
}

/** Helper: perform GET to Airtable and return parsed JSON (safe read) */
async function airtableGet(url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const text = await res.text();
  let json: any = {};
  if (text) {
    try {
      json = JSON.parse(text);
    } catch (e) {
      throw new Error(`Airtable returned invalid JSON: ${e}`);
    }
  }

  if (!res.ok) {
    // include Airtable body for debugging
    const bodyPreview = text ? `: ${text}` : "";
    throw new Error(`Airtable error ${res.status}${bodyPreview}`);
  }
  return json;
}

/** Find single record by slug (returns record object or null) */
async function findRecordBySlug(slug: string) {
  const filter = `({slug}='${slug.replace(/'/g, "\\'")}')`;
  const url = `${AIRTABLE_URL}?filterByFormula=${encodeURIComponent(filter)}&pageSize=1`;
  const json = await airtableGet(url);
  return json.records?.[0] ?? null;
}

/** GET /api/guest?slug=xxxx */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slugRaw = url.searchParams.get("slug") ?? "";
    const slug = slugRaw.trim().toLowerCase();

    if (!slug) {
      return NextResponse.json({ ok: false, message: "Missing slug" }, { status: 400 });
    }

    const record = await findRecordBySlug(slug);

    if (!record) {
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }

    // Map Airtable fields to guest shape
    const guest = {
      slug: (record.fields?.slug ?? "").toString(),
      name: (record.fields?.name ?? "").toString(),
      regalo: (record.fields?.regalo ?? "").toString(),
      confirmed: (record.fields?.confirmed ?? "").toString(),
      // add more fields if you need: phone, note, etc.
    };

    return NextResponse.json({ ok: true, guest }, { status: 200 });
  } catch (err: any) {
    console.error("API /api/guest error:", err);
    return NextResponse.json({ ok: false, error: err.message ?? String(err) }, { status: 500 });
  }
}