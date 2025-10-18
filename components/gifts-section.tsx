"use client"

import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GiftRow = {
  slug: string
  title: string
  description: string
  emoji?: string
}

const fallbackGifts: GiftRow[] = [
  {
    slug: "default-ropa",
    title: "Ropa Pokémon",
    description: "Bodys, pijamas con diseños de Charmander y Squirtle (tallas 0-6 meses)",
    emoji: "🎁",
  },
]

function parseCsv(csvText: string): GiftRow[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return []

  // header
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
  const rows: GiftRow[] = []
  for (let i = 1; i < lines.length; i++) {
    // naive CSV split that tolerates commas inside quotes
    const line = lines[i]
    const values: string[] = []
    let current = ""
    let inQuotes = false
    for (let j = 0; j < line.length; j++) {
      const ch = line[j]
      if (ch === '"' && line[j - 1] !== "\\") {
        inQuotes = !inQuotes
        continue
      }
      if (ch === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
        continue
      }
      current += ch
    }
    values.push(current.trim())

    const obj: any = {}
    headers.forEach((h, idx) => {
      obj[h] = (values[idx] ?? "").replace(/\\"/g, '"')
    })
    if (obj.slug && obj.title) {
      rows.push({
        slug: obj.slug,
        title: obj.title,
        description: obj.description ?? "",
        emoji: obj.emoji ?? "",
      })
    }
  }
  return rows
}

export function GiftsSectionClient() {
  const pathname = usePathname() ?? ""
  const slug = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean)
    return parts.length ? parts[parts.length - 1] : ""
  }, [pathname])

  const [gifts, setGifts] = useState<GiftRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch("/gifts.csv")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const txt = await res.text()
        return parseCsv(txt)
      })
      .then((rows) => {
        if (!mounted) return
        setGifts(rows.length ? rows : fallbackGifts)
      })
      .catch((err) => {
        console.error("Failed to load gifts.csv:", err)
        if (!mounted) return
        setError("No se pudo cargar lista de regalos, usando valores por defecto.")
        setGifts(fallbackGifts)
      })
    return () => {
      mounted = false
    }
  }, [])

  // decide what to render: match by slug, or render all suggestions if no slug
  const matched = useMemo(() => {
    if (!gifts) return null
    if (!slug) return gifts
    const found = gifts.filter((g) => g.slug === slug)
    return found.length ? found : null
  }, [gifts, slug])

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 text-4xl">
            🎁
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Regalo</h2>
        </div>

        {error && (
          <div className="mb-4 text-sm text-yellow-600">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matched === null ? (
            // no match: show all suggestions (or loading)
            (gifts ?? fallbackGifts).map((gift) => (
              <Card
                key={gift.slug}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                    {gift.emoji ?? "🎁"}
                  </div>
                  <CardTitle className="text-xl text-foreground">{gift.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty">{gift.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            matched.map((gift) => (
              <Card
                key={gift.slug}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                    {gift.emoji ?? "🎁"}
                  </div>
                  <CardTitle className="text-xl text-foreground">{gift.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty">{gift.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl px-8 py-6 max-w-2xl border-2 border-primary/20">
            <p className="text-foreground font-medium text-lg text-balance">
              ⚡ Nada nos haría más felices que compartir este día contigo. Te esperamos ⚡
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}