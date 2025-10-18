export function InvitationSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-4 mb-8 text-5xl">
          <span>🔥</span>
          <span>🥚</span>
          <span>💧</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          ¡Queremos Invitarte!
        </h2>

        <div className="bg-card rounded-2xl shadow-xl border-4 border-primary/20 p-8 md:p-12">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            Estamos emocionados de celebrar la llegada de nuestro pequeño entrenador Pokémon. Únete a nosotros en esta
            aventura especial llena de amor, risas y momentos inolvidables. Tu presencia hará este día aún más mágico
            mientras preparamos todo para recibir a nuestro bebé.
          </p>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-muted-foreground mb-2">📅 Fecha</p>
                <p className="text-xl font-semibold text-foreground">[Día, Mes Año]</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-6">
                <p className="text-muted-foreground mb-2">⏰ Hora</p>
                <p className="text-xl font-semibold text-foreground">[Hora]</p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-xl p-6">
              <p className="text-muted-foreground mb-2">👶 En honor a</p>
              <p className="text-2xl font-semibold text-primary">[Nombre de la Mamá]</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3 text-4xl">
          <span>🦎</span>
          <span>❤️</span>
          <span>🐢</span>
        </div>
      </div>
    </section>
  )
}
