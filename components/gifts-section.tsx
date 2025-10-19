"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GiftRow = {
  slug: string
  title: string
  description: string
  emoji?: string
}

type GuestApi = {
  slug: string
  name: string
  regalo?: string
  confirmed?: boolean
}

const fallbackGifts: GiftRow[] = [
  {
    slug: "default-ropa",
    title: "Ropa",
    description: "Bodys o pijamas (tallas 0-6 meses)",
    emoji: "🎁",
  },
  {
    slug: "default-libro",
    title: "Libro infantil",
    description: "Libros de cuentos para bebés",
    emoji: "📚",
  },
]

export function GiftsSection() {
  const search = useSearchParams()
  const slugParam = search?.get("slug") ?? ""
  const slug = useMemo(() => slugParam.trim().toLowerCase(), [slugParam])

  const [guest, setGuest] = useState<GuestApi | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function fetchGuest(s: string) {
      if (!s) {
        if (!mounted) return
        setGuest(null)
        setError(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      setGuest(null)

      try {
        const res = await fetch(`/api/guest?slug=${encodeURIComponent(s)}`, {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        })

        const text = await res.text()
        let json: any = {}
        if (text) {
          try {
            json = JSON.parse(text)
          } catch {
            throw new Error("Respuesta inválida del servidor")
          }
        }

        if (!res.ok) {
          const msg = (json && (json.message || JSON.stringify(json))) || `HTTP ${res.status}`
          throw new Error(String(msg))
        }

        if (json.ok && json.guest) {
          if (!mounted) return
          setGuest(json.guest as GuestApi)
        } else {
          if (!mounted) return
          setError("No se encontró el invitado.")
          setGuest(null)
        }
      } catch (err: any) {
        if (!mounted) return
        console.error("Failed to fetch guest:", err)
        setError(err?.message ?? String(err))
        setGuest(null)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    fetchGuest(slug)

    return () => {
      mounted = false
    }
  }, [slug])

  const computedTitle = loading
    ? "Cargando..."
    : guest?.regalo
    ? guest.regalo
    : "Regalo Sugerido"

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>🎁</span>
        </div>

        <h2 className="text-4xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          Regalo sugerido
        </h2>

        <div className="bg-card rounded-2xl shadow-xl border-4 border-primary/20 py-12 md:p-12">
          {loading ? (
            <div className="py-8 text-muted-foreground">Cargando regalo…</div>
          ) : guest?.regalo ? (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6 text-4xl">
                🛍️
              </div>
              <p className="text-2xl font-semibold text-foreground">{guest.regalo}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {fallbackGifts.map((regalo) => (
                <Card key={regalo.slug} className="w-full">
                  <CardHeader className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                      🛍️
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {regalo.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{regalo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}
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