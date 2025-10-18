export function InvitationSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>🔥</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          ¡Queremos Invitarte!
        </h2>

        <div className="bg-card rounded-2xl shadow-xl border-4 border-primary/20 p-8 md:p-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            Nos gustaria que nos acompañes a compartir un momento muy especial,
            Esperamos con mucha alegría la llegada de nuestro bebe Thiago,
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
      </div>
    </section>
  )
}
