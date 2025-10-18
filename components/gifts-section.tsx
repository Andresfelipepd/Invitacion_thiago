import { Gift, ShoppingBag, Heart, Shirt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const giftSuggestions = [
  {
    icon: Shirt,
    title: "Ropa Pokémon",
    description: "Bodys, pijamas con diseños de Charmander y Squirtle (tallas 0-6 meses)",
    emoji: "👕",
  },
  {
    icon: Gift,
    title: "Juguetes Pokémon",
    description: "Peluches de Pokémon, sonajeros, móviles para cuna temáticos",
    emoji: "🧸",
  },
  {
    icon: ShoppingBag,
    title: "Artículos de Cuidado",
    description: "Pañales, toallitas, cremas, productos de baño para el pequeño entrenador",
    emoji: "🍼",
  },
  {
    icon: Heart,
    title: "Lo que Prefieras",
    description: "Tu presencia es el mejor regalo para esta aventura",
    emoji: "💝",
  },
]

export function GiftsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6 text-4xl">
            🎁
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Sugerencias de Regalo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Si deseas traer un regalo para el futuro entrenador Pokémon, aquí hay algunas ideas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftSuggestions.map((gift, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 text-3xl">
                  {gift.emoji}
                </div>
                <CardTitle className="text-xl text-foreground">{gift.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{gift.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl px-8 py-6 max-w-2xl border-2 border-primary/20">
            <p className="text-foreground font-medium text-lg text-balance">
              ⚡ Recuerda: Tu presencia es lo más importante. Los regalos son opcionales. ⚡
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
