import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Baby Shower de Thiago - ¡Celebremos Juntos!",
  description: "Invitación para celebrar el baby shower de Thiago con nosotros 💙",
  openGraph: {
    title: "Baby Shower de Thiago - ¡Celebremos Juntos!",
    description: "Invitación especial para el baby shower de Thiago 💙",
    url: "https://babyshower.brota.tech",
    siteName: "Baby Shower Thiago",
    images: [
      {
        url: "https://fb.brota.tech/miniatura.jpeg", // 👈 URL completa de la imagen
        width: 1200,
        height: 630,
        alt: "Invitación Baby Shower Thiago",
      },
    ],
    locale: "es_CO",
    type: "website",
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
