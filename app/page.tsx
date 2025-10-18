import React, { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { InvitationSection } from "@/components/invitation-section"
import { GiftsSection } from "@/components/gifts-section"
import { LocationSection } from "@/components/location-section"

export const dynamic = "force-dynamic";

export default function BabyShowerInvitation() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <InvitationSection />
      <Suspense fallback={<div>Cargando regalos…</div>}>
        <GiftsSection />
      </Suspense>
      <LocationSection />
    </main>
  )
}
