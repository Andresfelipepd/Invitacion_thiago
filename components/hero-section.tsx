import { Baby, Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-secondary overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center">
        {/* Icon decoration */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in">
          <Sparkles className="w-8 h-8 text-primary animate-bounce" />
          <Baby className="w-12 h-12 text-primary" />
          <Sparkles className="w-8 h-8 text-primary animate-bounce delay-300" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 animate-fade-in-up text-balance">
          ¡Celebremos Juntos!
        </h1>

        {/* Subheading */}
        <div className="space-y-4 mb-8 animate-fade-in-up delay-200">
          <p className="text-2xl md:text-3xl text-foreground font-medium">Baby Shower</p>
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <p className="text-xl md:text-2xl text-muted-foreground">Un nuevo bebé está en camino</p>
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
        </div>

        {/* Event details */}
        <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto animate-fade-in-up delay-300">
          <div className="space-y-6 text-lg md:text-xl">
            <div>
              <p className="text-muted-foreground mb-2">En honor a</p>
              <p className="text-2xl md:text-3xl font-semibold text-primary">Thiago andres peralta rey</p>
            </div>

            <div className="h-px bg-border" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground mb-2">Fecha</p>
                <p className="font-semibold text-foreground">[23, Octubre 2025]</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Hora</p>
                <p className="font-semibold text-foreground">[3:00 PM]</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="text-muted-foreground mb-2">Lugar</p>
              <p className="font-semibold text-foreground text-pretty">[Dirección del evento]</p>
            </div>
          </div>
        </div>

        {/* RSVP message */}
        <p className="mt-8 text-muted-foreground animate-fade-in-up delay-500">Por favor confirma tu asistencia</p>
      </div>
    </section>
  )
}
