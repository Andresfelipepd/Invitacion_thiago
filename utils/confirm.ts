// utils/confirm.ts (o dentro del componente)
export async function confirmAttendance(slug: string) {
  const body = { slug };
  const res = await fetch("/api/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error || json?.message || "Error confirming");
  }
  return json;
}