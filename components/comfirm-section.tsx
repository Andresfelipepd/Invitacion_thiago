"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { confirmAttendance } from "@/utils/confirm"

type GuestApi = {
  slug: string
  name: string
  gift?: string
  confirmed?: boolean
}

export function ConfirmSection() {
  const search = useSearchParams()
  const rawSlug = search?.get("slug") ?? ""
  const slug = useMemo(() => rawSlug.trim().toLowerCase(), [rawSlug])

  const [guest, setGuest] = useState<GuestApi | null>(null)
  const [loadingGuest, setLoadingGuest] = useState<boolean>(false)
  const [errorGuest, setErrorGuest] = useState<string | null>(null)

  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  // Load guest on mount / when slug changes
  useEffect(() => {
    let mounted = true
    async function loadGuest(s: string) {
      if (!s) {
        if (!mounted) return
        setGuest(null)
        setErrorGuest(null)
        setMessage(null)
        setLoadingGuest(false)
        return
      }

      setLoadingGuest(true)
      setErrorGuest(null)
      setMessage(null)
      setGuest(null)

      try {
        const res = await fetch(`/api/guest?slug=${encodeURIComponent(s)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const text = await res.text()
        let json: any = {}
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

        if (json.ok && json.guest) {
          if (!mounted) return
          setGuest(json.guest as GuestApi)
          // if already confirmed, show message
          if (json.guest.confirmed) {
            setMessage("✅ Tu asistencia ya está confirmada. ¡Gracias!")
          } else {
            setMessage(null)
          }
        } else {
          if (!mounted) return
          setGuest(null)
          setErrorGuest("No se encontró el invitado.")
          setMessage(null)
        }
      } catch (err: any) {
        if (!mounted) return
        console.error("Failed to fetch guest:", err)
        setErrorGuest(err?.message ?? String(err))
        setGuest(null)
        setMessage(null)
      } finally {
        if (!mounted) return
        setLoadingGuest(false)
      }
    }

    loadGuest(slug)

    return () => {
      mounted = false
    }
  }, [slug])

  async function handleConfirm() {
    if (!slug) {
      setMessage("No hay slug en la URL.")
      return
    }
    if (guest?.confirmed) {
      setMessage("✅ Ya estás confirmado.")
      return
    }

    try {
      setLoadingConfirm(true)
      setMessage(null)
      const resp = await confirmAttendance(slug)
      // resp should be { ok: true, updated: true } or ok:true updated:false
      if (resp?.ok && resp?.updated) {
        setMessage("🎉 Confirmación registrada. ¡Gracias!")
        // mark local guest as confirmed so UI updates and button disables
        setGuest((g) => (g ? { ...g, confirmed: true } : g))
      } else if (resp?.ok && resp?.updated === false) {
        setMessage("✅ Ya estaba confirmado.")
        setGuest((g) => (g ? { ...g, confirmed: true } : g))
      } else if (resp?.ok === false && resp?.message) {
        setMessage("No se encontró el invitado: " + resp.message)
      } else {
        setMessage("Ocurrió un error al confirmar. Intenta de nuevo.")
      }
    } catch (err: any) {
      console.error("confirm error", err)
      setMessage("Error al confirmar: " + (err?.message ?? String(err)))
    } finally {
      setLoadingConfirm(false)
    }
  }

  const title = loadingGuest
    ? "Comprobando..."
    : guest
    ? `¿Confirmas tu asistencia?`
    : !slug
    ? "Confirma tu asistencia"
    : "Invitado no encontrado"

  const disabled = loadingGuest || loadingConfirm || !!guest?.confirmed

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>✅</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          {title}
        </h2>

        <div className="bg-card rounded-2xl shadow-xl border-4 border-primary/20 p-8 md:p-12">
          {errorGuest && <p className="mb-4 text-sm text-rose-600">{errorGuest}</p>}

         <div className="flex flex-col items-center gap-4">
           <button
             onClick={handleConfirm}
             disabled={disabled}
             aria-disabled={disabled}
             className={`inline-block w-full sm:w-auto px-8 py-3 rounded-2xl text-white font-semibold transition transform disabled:opacity-50 disabled:cursor-not-allowed ${
               disabled ? "bg-gray-400" : "bg-primary hover:scale-105"
             }`}
           >
             {loadingConfirm ? "Confirmando..." : guest?.confirmed ? "Confirmado" : "Confirmar asistencia"}
           </button>

           <button
             onClick={() => {
               // quick WhatsApp fallback: open prefilled message
               const phone = "573028332165" // cambia si hace falta
               const msg = encodeURIComponent(
                 `Hola, quiero confirmar mi asistencia${guest ? " — " + guest.name : ""}`
               )
               window.open(`https://wa.me/${phone}?text=${msg}`, "_blank")
             }}
             className="text-sm text-muted-foreground underline"
           >
             Prefiero confirmar por WhatsApp
           </button>

           {message && <p className="mt-3 text-sm text-foreground">{message}</p>}
        </div>
      </div>
      </div>
    </section>
  )
}