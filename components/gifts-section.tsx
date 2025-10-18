import { Gift, ShoppingBag, Heart, Shirt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const giftSuggestions = [
  {
    icon: Shirt,
    title: "Ropa",
    description: "Bodys, pijamas, calcetines (tallas 0-6 meses)",
  },
  {
    icon: Gift,
    title: "Juguetes",
    description: "Sonajeros, peluches suaves, móviles para cuna",
  },
  {
    icon: ShoppingBag,
    title: "Artículos de cuidado",
    description: "Pañales, toallitas, cremas, productos de baño",
  },
  {
    icon: Heart,
    title: "Lo que prefieras",
    description: "Tu presencia es el mejor regalo",
  },
]

export function GiftsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Sugerencias de Regalo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Si deseas traer un regalo, aquí hay algunas ideas que serían muy útiles
          </p>
        </div>

        {/* Gift cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftSuggestions.map((gift, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <gift.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{gift.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{gift.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-accent/30 rounded-2xl px-8 py-6 max-w-2xl">
            <p className="text-foreground font-medium text-lg text-balance">
              💝 Recuerda: Tu presencia es lo más importante. Los regalos son opcionales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
