"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

type GuestRow = {
  slug: string
  name: string
}

type ApiResponse = {
  ok?: boolean
  guest?: GuestRow | null
  message?: string
}

export function InvitationSectionClient() {
  const search = useSearchParams()
  const rawSlug = search?.get("slug") ?? ""
  const slug = useMemo(() => rawSlug.trim().toLowerCase(), [rawSlug])

  const [guest, setGuest] = useState<GuestRow | null>(null)
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const text = await res.text()
        let json: ApiResponse = {}
        if (text) {
          try {
            json = JSON.parse(text)
          } catch (e) {
            throw new Error("Respuesta no válida del servidor")
          }
        }

        if (!res.ok) {
          const msg = (json && (json.message || JSON.stringify(json))) || `HTTP ${res.status}`
          throw new Error(String(msg))
        }

        const found = json.guest ?? null
        if (!mounted) return
        if (found) {
          setGuest(found)
          setError(null)
        } else {
          setGuest(null)
          setError("No se encontró el invitado.")
        }
      } catch (err: any) {
        if (!mounted) return
        console.error("fetch guest error", err)
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

  const title = loading
    ? "Cargando..."
    : guest
    ? `¡Hola, ${guest.name}!`
    : !slug
    ? "¡Queremos Invitarte!"
    : `No encontramos a "${slug}"`

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>🔥</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          {title}
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