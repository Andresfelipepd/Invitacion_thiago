import React, { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { InvitationSectionClient } from "@/components/invitation-section"
import { GiftsSection } from "@/components/gifts-section"
import { LocationSection } from "@/components/location-section"
import { ConfirmSection } from "@/components/comfirm-section"
export const dynamic = "force-dynamic";

export default function BabyShowerInvitation() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<div>Cargando personas…</div>}>
        <InvitationSectionClient />
      </Suspense>
      <ConfirmSection/>
      <Suspense fallback={<div>Cargando regalos…</div>}>
        <GiftsSection />
      </Suspense>
      <LocationSection />
    </main>
  )
}
