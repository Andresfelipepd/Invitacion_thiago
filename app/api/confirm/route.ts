// app/api/confirm/route.ts
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

/** helper: search record by slug */
async function findRecordBySlug(slug: string) {
  const filter = `({slug}='${slug.replace(/'/g, "\\'")}')`;
  const url = `${AIRTABLE_URL}?filterByFormula=${encodeURIComponent(filter)}&pageSize=1`;
  console.log(url)
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();

  console.log(json)

  if (!res.ok) {
    throw new Error(`Airtable find error: ${res.status}`);
  }
  return json.records?.[0] ?? null;
}

/** helper: update record fields */
async function updateRecord(recordId: string, fields: Record<string, any>) {
  const url = `${AIRTABLE_URL}/${recordId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Airtable update error: ${res.status} ${txt}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slugRaw = body?.slug;
    if (!slugRaw || typeof slugRaw !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }
    const slug = slugRaw.trim().toLowerCase();

    // 1) buscar registro por slug
    const record = await findRecordBySlug(slug);

    if (!record) {
      // No se encontró. Puedes optar por crear el registro en su lugar.
      // Por ahora devolvemos 404 para que el cliente lo maneje.
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }

    const recordId = record.id;

    // 2) comprobar si ya está confirmado
    const currentConfirmed = record.fields?.confirmed;
    if (currentConfirmed === true || currentConfirmed === "true") {
      return NextResponse.json({ ok: true, updated: false, message: "Already confirmed" });
    }

    // 3) actualizar campo confirmed = true (y opcionalmente agregar note/phone)
    const updateFields: Record<string, any> = { confirmed: true };
    if (body.note) updateFields.note = body.note;
    if (body.phone) updateFields.phone = body.phone;

    const updated = await updateRecord(recordId, updateFields);

    return NextResponse.json({ ok: true, updated: true, record: updated });
  } catch (err: any) {
    console.error("API /api/confirm error:", err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}