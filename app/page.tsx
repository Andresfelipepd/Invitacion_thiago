import { HeroSection } from "@/components/hero-section"
import { InvitationSection } from "@/components/invitation-section"
import { GiftsSection } from "@/components/gifts-section"
import { LocationSection } from "@/components/location-section"

export default function BabyShowerInvitation() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <InvitationSection />
      <GiftsSection />
      <LocationSection />
    </main>
  )
}
