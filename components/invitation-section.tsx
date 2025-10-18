"use client"

import { useSearchParams } from "next/navigation"
import { delimiter } from "path"
import { useEffect, useMemo, useState } from "react"

type GuestRow = {
  slug: string
  name: string
}

function parseCsv(csvText: string): GuestRow[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return []

  const headers = lines[0].split(";").map((h) => h.trim().toLowerCase())
  const slugIdx = headers.indexOf("slug")
  const nameIdx = headers.indexOf("name")
  if (slugIdx === -1 || nameIdx === -1) return []

  const rows: GuestRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // simple CSV parser that tolerates quoted values with commas
    const values: string[] = []
    let current = ""
    let inQuotes = false
    for (let j = 0; j < line.length; j++) {
      const ch = line[j]
      if (ch === '"' && line[j - 1] !== "\\") {
        inQuotes = !inQuotes
        continue
      }
      if (ch === ";" && !inQuotes) {
        values.push(current.trim())
        current = ""
        continue
      }
      current += ch
    }
    values.push(current.trim())

    const slug = values[slugIdx] ?? ""
    const name = values[nameIdx] ?? ""
    if (slug) {
      rows.push({ slug: slug.replace(/^"|"$/g, ""), name: name.replace(/^"|"$/g, "") })
    }
  }
  return rows
}

export function InvitationSectionClient() {
  const search = useSearchParams()
  const rawSlug = search?.get("slug") ?? ""
  const slug = useMemo(() => rawSlug.trim().toLowerCase(), [rawSlug])

  const [guests, setGuests] = useState<GuestRow[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch("/gifts.csv")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const txt = await res.text()
        return parseCsv(txt)
      })
      .then((rows) => {
        if (!mounted) return
        setGuests(rows)
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to load guests.csv:", err)
        if (!mounted) return
        setError("No se pudo cargar la lista de invitados.")
        setGuests([])
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  // busca por slug (insensible a mayúsculas)
  const matched = useMemo(() => {
    if (!guests || !slug) return null
    return guests.find((g) => g.slug.trim().toLowerCase() === slug) ?? null
  }, [guests, slug])

  const title = matched ? `¡Hola, ${matched.name}!` : !slug ? "¡Queremos Invitarte!" : `No encontramos a "${slug}"`

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>🔥</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          {loading ? "Cargando..." : title}
        </h2>

        <div className="bg-card rounded-2xl shadow-xl border-4 border-primary/20 p-8 md:p-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            Nos gustaría que nos acompañes a compartir un momento muy especial.
            Esperamos con mucha alegría la llegada de nuestro bebé Thiago,
            y no hay mejor manera de celebrarlo que rodeados del cariño de quienes más queremos.
          </p>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-muted-foreground mb-2">🗓️ Fecha</p>
                <p className="text-xl font-semibold text-foreground">Noviembre 23</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-muted-foreground mb-2">⏰ Hora</p>
                <p className="text-xl font-semibold text-foreground">3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}
      </div>
    </section>
  )
}