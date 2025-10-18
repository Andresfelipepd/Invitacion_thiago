"use client"

import { MapPin, Navigation, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function LocationSection() {
  const address = "[Dirección completa del evento]"
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">¿Cómo Llegar?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Encuentra la mejor ruta para llegar al evento
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Location details */}
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Dirección</h3>
                    <p className="text-muted-foreground text-pretty">{address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Horario</h3>
                    <p className="text-muted-foreground">[Día] a las [Hora]</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Contacto</h3>
                    <p className="text-muted-foreground">[Teléfono]</p>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    onClick={() => window.open(googleMapsUrl, "_blank")}
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Abrir en Google Maps
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-2 bg-transparent"
                    size="lg"
                    onClick={() => window.open(wazeUrl, "_blank")}
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Abrir en Waze
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map placeholder */}
          <Card className="border-2 overflow-hidden">
            <CardContent className="p-0 h-full min-h-[400px]">
              <div className="relative w-full h-full bg-muted flex items-center justify-center">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del evento"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-2 border-primary/20 bg-card">
            <CardContent className="px-8 py-6">
              <p className="text-foreground font-medium text-lg text-balance">
                🚗 Estacionamiento disponible • ♿ Acceso para sillas de ruedas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
