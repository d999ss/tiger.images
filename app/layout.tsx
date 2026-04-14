import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Product Image Audit — Tiger BioSciences",
  description: "Internal product image tracking for Tiger BioSciences",
  robots: "noindex, nofollow",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
