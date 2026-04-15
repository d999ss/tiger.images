"use client"

import Image from "next/image"
import { useState } from "react"

type Division = "wound" | "aesthetics"
type ImageStatus = "real" | "placeholder" | "missing" | "needs-review"

interface Product {
  slug: string
  title: string
  navName: string
  heroImage: string
  division: Division
  fileSize: number
}

const PRODUCTS: Product[] = [
  { slug: "caregraft", title: "caregraFT\u2122", navName: "caregraFT\u2122", heroImage: "/images/tiger-assets/caregraft.png", division: "wound", fileSize: 84052 },
  { slug: "carepatch", title: "carePATCH\u00AE", navName: "carePATCH\u00AE", heroImage: "/images/tiger-assets/carepatch.png", division: "wound", fileSize: 41669 },
  { slug: "carepac", title: "carePAC\u2122", navName: "carePAC\u2122", heroImage: "/images/tiger-assets/carepac-logo.png", division: "wound", fileSize: 52778 },
  { slug: "completeft", title: "completeFT\u00AE", navName: "completeFT\u00AE", heroImage: "/images/tiger-assets/completeft.png", division: "wound", fileSize: 43759 },
  { slug: "healpack", title: "HealPACK\u2122", navName: "HealPACK\u2122", heroImage: "/images/tiger-assets/healpack.png", division: "wound", fileSize: 56602 },
  { slug: "alloclae", title: "alloClae\u2122", navName: "alloClae\u2122", heroImage: "/images/tiger-assets/alloclae.png", division: "aesthetics", fileSize: 38761 },
  { slug: "amplifine", title: "Amplifine\u00AE", navName: "Amplifine\u00AE", heroImage: "/images/tiger-assets/amplifine.png", division: "aesthetics", fileSize: 57014 },
  { slug: "aveli", title: "Av\u00E9li\u00AE", navName: "Av\u00E9li\u00AE", heroImage: "/images/tiger-assets/aveli.png", division: "aesthetics", fileSize: 66551 },
  { slug: "bellafill", title: "Bellafill\u00AE", navName: "Bellafill\u00AE", heroImage: "/images/tiger-assets/bellafill-logo.png", division: "aesthetics", fileSize: 47146 },
  { slug: "expanders", title: "Breast Tissue Expanders", navName: "Breast Tissue Expanders", heroImage: "/images/tiger-assets/expanders.png", division: "aesthetics", fileSize: 67795 },
  { slug: "sientra", title: "Sientra\u00AE", navName: "Sientra\u00AE", heroImage: "/images/tiger-assets/sientra.png", division: "aesthetics", fileSize: 37579 },
  { slug: "viality", title: "Viality\u00AE", navName: "Viality\u00AE", heroImage: "/images/tiger-assets/viality.png", division: "aesthetics", fileSize: 57896 },
  { slug: "implant-delivery", title: "Tiger Guard\u2122", navName: "Tiger Guard\u2122", heroImage: "/images/tiger-assets/tigerguard.png", division: "aesthetics", fileSize: 47303 },
  { slug: "retractor", title: "Tiger View\u2122", navName: "Tiger View\u2122", heroImage: "/images/figma/prod-generic-box-aesthetics.png", division: "aesthetics", fileSize: 264510 },
]

const DIVISIONS: { key: Division; label: string; color: string; slugs: string[] }[] = [
  {
    key: "wound",
    label: "Wound Care Solutions",
    color: "#DF5630",
    slugs: ["caregraft", "carepatch", "carepac", "completeft", "healpack"],
  },
  {
    key: "aesthetics",
    label: "Aesthetic Solutions",
    color: "#D2A62C",
    slugs: ["alloclae", "amplifine", "aveli", "bellafill", "expanders", "sientra", "viality", "implant-delivery", "retractor"],
  },
]

const NEEDS_REVIEW_SLUGS = ["expanders", "retractor"]

function classifyImage(heroImage: string, slug?: string): ImageStatus {
  if (!heroImage) return "missing"
  if (slug && NEEDS_REVIEW_SLUGS.includes(slug)) return "needs-review"
  if (heroImage.includes("prod-generic-box")) return "needs-review"
  return "real"
}

function formatSize(bytes: number): string {
  const kb = Math.round(bytes / 1024)
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

const IMAGE_STATUS_STYLES: Record<ImageStatus, { label: string; color: string }> = {
  real: { label: "Brand Logo", color: "bg-[#0d7a3e]/10 text-[#0d7a3e] border-[#0d7a3e]/25" },
  "needs-review": { label: "No Logo Found", color: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/25" },
  placeholder: { label: "No Logo Found", color: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/25" },
  missing: { label: "No Image", color: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/25" },
}

export default function ImageAuditPage() {
  const [preview, setPreview] = useState<Product | null>(null)

  const total = PRODUCTS.length
  const realCount = PRODUCTS.filter(p => classifyImage(p.heroImage, p.slug) === "real").length
  const reviewCount = PRODUCTS.filter(p => classifyImage(p.heroImage, p.slug) === "needs-review").length
  const placeholderCount = PRODUCTS.filter(p => classifyImage(p.heroImage, p.slug) === "placeholder").length
  const missingCount = PRODUCTS.filter(p => classifyImage(p.heroImage, p.slug) === "missing").length
  const needsWork = reviewCount + placeholderCount + missingCount

  return (
    <div className="min-h-screen" style={{ background: "#EFEDEA" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-[4px] font-light mb-3" style={{ color: "rgba(35,16,16,0.5)" }}>
            Internal
          </div>
          <h1 className="font-light tracking-tight leading-tight" style={{ color: "#231010", fontSize: "clamp(24px,4vw,42px)" }}>
            Product Image Audit
          </h1>
          <p className="mt-3 text-[14px] sm:text-[14.6px] font-light leading-[24px] sm:leading-[26px] max-w-2xl" style={{ color: "rgba(35,16,16,0.6)" }}>
            Brand logos for the {total} products listed in the site navigation. {realCount} of {total} have approved logos.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          <StatCard label="Total" value={total} />
          <StatCard label="Ready" value={realCount} accent="#0d7a3e" />
          <StatCard label="Needs Review" value={reviewCount} accent="#D2A62C" />
          <StatCard label="No Logo" value={placeholderCount} accent="#DF5630" />
          <StatCard label="Missing" value={missingCount} accent="#DF5630" />
        </div>

        {/* Divisions */}
        {DIVISIONS.map(div => {
          const divProducts = div.slugs.map(s => PRODUCTS.find(p => p.slug === s)!).filter(Boolean)
          return (
            <div key={div.key} className="mt-10 sm:mt-12">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="rounded-full" style={{ width: 8, height: 8, background: div.color }} />
                <h2 className="font-light text-[18px] sm:text-[20px] tracking-tight" style={{ color: "#231010" }}>
                  {div.label}
                </h2>
                <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.45)" }}>
                  {divProducts.length} products
                </span>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {divProducts.map(p => {
                  const imgStatus = classifyImage(p.heroImage, p.slug)
                  const imgStyle = IMAGE_STATUS_STYLES[imgStatus]

                  return (
                    <div
                      key={p.slug}
                      className="rounded-[12px] border overflow-hidden"
                      style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}
                    >
                      {/* Mobile: stacked layout */}
                      <div className="sm:hidden">
                        <button
                          onClick={() => setPreview(p)}
                          className="w-full aspect-[3/1] relative cursor-pointer"
                          style={{ background: "rgba(35,16,16,0.03)" }}
                        >
                          <Image
                            src={p.heroImage}
                            alt={p.title}
                            fill
                            sizes="100vw"
                            className="object-contain p-4"
                          />
                        </button>
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-light text-[14px] tracking-tight min-w-0 truncate" style={{ color: "#231010" }}>
                              {p.navName}
                            </div>
                            <span className={`inline-flex items-center px-2 py-0.5 text-[8px] uppercase tracking-[1.2px] font-light rounded-full border shrink-0 ${imgStyle.color}`}>
                              {imgStyle.label}
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="text-[10px] font-mono" style={{ color: "rgba(35,16,16,0.35)" }}>
                              {formatSize(p.fileSize)}
                            </span>
                            <a
                              href={p.heroImage}
                              download={`${p.slug}.png`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] uppercase tracking-[1.2px] font-light rounded-full border"
                              style={{ color: "rgba(35,16,16,0.5)", borderColor: "rgba(35,16,16,0.12)" }}
                            >
                              <DownloadIcon />
                              Download
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Desktop: row layout */}
                      <div className="hidden sm:flex sm:flex-row">
                        <button
                          onClick={() => setPreview(p)}
                          className="w-[180px] min-h-[120px] relative shrink-0 cursor-pointer"
                          style={{ background: "rgba(35,16,16,0.03)" }}
                        >
                          <Image
                            src={p.heroImage}
                            alt={p.title}
                            fill
                            sizes="180px"
                            className="object-cover"
                          />
                        </button>

                        <div className="flex-1 p-4 flex flex-row items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="font-light text-[15px] tracking-tight" style={{ color: "#231010" }}>
                              {p.navName}
                            </div>
                            <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono" style={{ color: "rgba(35,16,16,0.35)" }}>
                              <span className="truncate">{p.heroImage}</span>
                              <span className="shrink-0">{formatSize(p.fileSize)}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] uppercase tracking-[1.5px] font-light rounded-full border ${imgStyle.color}`}>
                              {imgStyle.label}
                            </span>
                            <a
                              href={p.heroImage}
                              download={`${p.slug}.png`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] uppercase tracking-[1.5px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]"
                              style={{ color: "rgba(35,16,16,0.5)", borderColor: "rgba(35,16,16,0.12)" }}
                            >
                              <DownloadIcon />
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Action Items */}
        {needsWork > 0 && (
          <div className="mt-10 sm:mt-14 rounded-[12px] border p-4 sm:p-6" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}>
            <h2 className="font-light text-[18px] sm:text-[20px] tracking-tight mb-4 sm:mb-5" style={{ color: "#231010" }}>
              Needs Attention
            </h2>
            <div className="space-y-2">
              {PRODUCTS.filter(p => classifyImage(p.heroImage, p.slug) !== "real").map(p => {
                const divColor = DIVISIONS.find(d => d.key === p.division)?.color || "#231010"
                return (
                  <div key={p.slug} className="flex items-center gap-2">
                    <div className="rounded-full shrink-0" style={{ width: 5, height: 5, background: divColor }} />
                    <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.65)" }}>
                      {p.navName}
                    </span>
                    <span className="text-[10px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>
                      {classifyImage(p.heroImage, p.slug) === "needs-review" ? "Needs Review" : classifyImage(p.heroImage, p.slug) === "placeholder" ? "No Logo" : "Missing"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 sm:mt-10 text-center text-[11px] font-light" style={{ color: "rgba(35,16,16,0.35)" }}>
          Internal use only \u2014 Tiger BioSciences Product Image Audit \u2014 {total} nav products
        </div>
      </div>

      {/* Lightbox Preview */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(35,16,16,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-[16px] overflow-hidden"
            style={{ background: "#fbfcff" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square" style={{ background: "rgba(35,16,16,0.03)" }}>
              <Image
                src={preview.heroImage}
                alt={preview.title}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-contain p-6"
                priority
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-light text-[15px] tracking-tight" style={{ color: "#231010" }}>
                  {preview.navName}
                </div>
                <div className="text-[11px] font-mono mt-0.5" style={{ color: "rgba(35,16,16,0.35)" }}>
                  {formatSize(preview.fileSize)}
                </div>
              </div>
              <a
                href={preview.heroImage}
                download={`${preview.slug}.png`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[1.5px] font-light rounded-[6px] border shrink-0"
                style={{ color: "#231010", borderColor: "rgba(35,16,16,0.15)", background: "rgba(35,16,16,0.04)" }}
              >
                <DownloadIcon />
                Download
              </a>
            </div>
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
              style={{ background: "rgba(35,16,16,0.06)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(35,16,16,0.5)" }}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-[12px] border p-3 sm:p-4" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}>
      <div className="text-[9px] sm:text-[10px] uppercase tracking-[2px] font-light mb-1" style={{ color: "rgba(35,16,16,0.5)" }}>{label}</div>
      <div className="text-[22px] sm:text-[26px] font-light tracking-tight" style={{ color: accent || "#231010" }}>
        {value}
      </div>
    </div>
  )
}
