import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Brand Asset Audit — Tiger BioSciences",
  description: "Internal brand asset tracking for Tiger BioSciences",
  robots: "noindex, nofollow",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
