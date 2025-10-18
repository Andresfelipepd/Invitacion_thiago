"use client";

import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LocationSection() {
  const address = "Cra. 68f #65-01";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`;

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 text-4xl">
            🗺️
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            ¿Cómo Llegar?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Dirección
                    </h3>
                    <p className="text-muted-foreground text-pretty">
                      Salon comunal Estradita ciudad de Honda
                    </p>
                    <p className="text-muted-foreground text-pretty">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Horario
                    </h3>
                    <p className="text-muted-foreground">
                      23 de noviembre a las 3:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Contacto
                    </h3>
                    <p className="text-muted-foreground flex flex-col space-y-1">
                      <a
                        href="https://wa.me/573028332165"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        302 8332165
                      </a>
                      <a
                        href="https://wa.me/573002807633"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        300 2807633
                      </a>
                    </p>
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
                    className="w-full border-2 border-accent hover:bg-accent/10 bg-transparent"
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

          <Card className="border-2 border-accent/20 overflow-hidden">
            <CardContent className="p-0 h-full min-h-[400px]">
              <div className="relative w-full h-full bg-muted flex items-center justify-center">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    address
                  )}`}
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

        <div className="mt-12 text-center">
          <Card className="inline-block border-2 border-primary/20 bg-card">
            <CardContent className="px-8 py-6">
              <p className="text-foreground font-medium text-lg text-balance">
                🚗 Estacionamiento disponible
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
