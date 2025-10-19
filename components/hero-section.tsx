export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-20">
          🔥
        </div>
        <div className="absolute top-20 right-20 text-6xl animate-float animation-delay-400 opacity-20">
          💧
        </div>
        <div className="absolute bottom-20 left-20 text-6xl animate-float animation-delay-600 opacity-20">
          ⚡
        </div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float animation-delay-200 opacity-20">
          ✨
        </div>
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="flex-1 flex items-center justify-center m-0 p-0 opacity-0 animate-scale-in animation-delay-200">
          <div className="w-full max-w-2xl m-0 p-0">
            <img
              src="/banner.jpeg"
              alt="Baby Shower Pokémon"
              className="w-full h-full object-cover m-0 p-0"
            />
          </div>
        </div>

        {/* Desliza para más información */}
        <div className="text-center py-8 opacity-0 animate-fade-in animation-delay-600">
          <div className="inline-flex flex-col items-center gap-2 text-foreground/70 animate-bounce-slow">
            <span className="text-sm font-medium">
              Desliza para más información
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Fecha del evento */}
        <div className="text-center pb-8 opacity-0 animate-fade-in-up animation-delay-400">
          <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-2xl border-4 border-white">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🗓️</span>
              <div className="text-left">
                <p className="text-sm text-muted-foreground font-medium">
                  Fecha del Evento
                </p>
                <p className="text-2xl font-bold bg-clip-text">
                  23 Noviembre del 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
