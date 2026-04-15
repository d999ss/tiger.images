"use client"

import Image from "next/image"
import { useState } from "react"

type Division = "wound" | "aesthetics"

interface Product {
  slug: string
  navName: string
  logo: string | null
  logoSize: number
  packaging: string | null
  packagingSize: number
  location: string | null
  locationSize: number
  division: Division
}

const PRODUCTS: Product[] = [
  { slug: "caregraft", navName: "caregraFT\u2122", logo: "/images/tiger-assets/caregraft.png", logoSize: 84052, packaging: null, packagingSize: 0, location: "/images/locations/caregraft.png", locationSize: 1617527, division: "wound" },
  { slug: "carepatch", navName: "carePATCH\u2122", logo: "/images/tiger-assets/carepatch.png", logoSize: 41236, packaging: null, packagingSize: 0, location: "/images/locations/carepatch.png", locationSize: 1985053, division: "wound" },
  { slug: "carepac", navName: "carePAC\u2122", logo: "/images/tiger-assets/carepac-logo.png", logoSize: 26332, packaging: null, packagingSize: 0, location: null, locationSize: 0, division: "wound" },
  { slug: "completeft", navName: "completeFT\u00AE", logo: "/images/tiger-assets/completeft.png", logoSize: 43759, packaging: null, packagingSize: 0, location: null, locationSize: 0, division: "wound" },
  { slug: "healpack", navName: "HealPACK\u2122", logo: "/images/tiger-assets/healpack.png", logoSize: 56602, packaging: null, packagingSize: 0, location: null, locationSize: 0, division: "wound" },
  { slug: "carebox", navName: "careBOX\u2122", logo: null, logoSize: 0, packaging: "/images/products/carebox.png", packagingSize: 236265, location: null, locationSize: 0, division: "wound" },
  { slug: "alloclae", navName: "alloClae\u2122", logo: "/images/tiger-assets/alloclae.png", logoSize: 38761, packaging: null, packagingSize: 0, location: "/images/locations/alloclae.png", locationSize: 1445980, division: "aesthetics" },
  { slug: "amplifine", navName: "Amplifine\u00AE", logo: "/images/tiger-assets/amplifine.png", logoSize: 80730, packaging: "/images/products/amplifine.png", packagingSize: 140416, location: "/images/locations/amplifine.png", locationSize: 1652621, division: "aesthetics" },
  { slug: "aveli", navName: "Av\u00E9li\u00AE", logo: "/images/tiger-assets/aveli.png", logoSize: 66551, packaging: null, packagingSize: 0, location: "/images/locations/aveli.png", locationSize: 907525, division: "aesthetics" },
  { slug: "bellafill", navName: "Bellafill\u00AE", logo: "/images/tiger-assets/bellafill-logo.png", logoSize: 47146, packaging: null, packagingSize: 0, location: "/images/locations/bellafill.png", locationSize: 1652621, division: "aesthetics" },
  { slug: "expanders", navName: "Breast Tissue Expanders", logo: null, logoSize: 0, packaging: "/images/products/expanders.png", packagingSize: 317930, location: "/images/locations/expanders.png", locationSize: 1824612, division: "aesthetics" },
  { slug: "sientra", navName: "Sientra\u00AE", logo: "/images/tiger-assets/sientra.png", logoSize: 37579, packaging: null, packagingSize: 0, location: "/images/locations/sientra.png", locationSize: 1797742, division: "aesthetics" },
  { slug: "silhouette", navName: "Silhouette Instalift\u2122", logo: "/images/tiger-assets/silhouette.png", logoSize: 20079, packaging: null, packagingSize: 0, location: "/images/locations/silhouette.png", locationSize: 1824612, division: "aesthetics" },
  { slug: "viality", navName: "Viality\u00AE", logo: "/images/tiger-assets/viality.png", logoSize: 57896, packaging: "/images/products/viality.png", packagingSize: 439547, location: "/images/locations/viality.png", locationSize: 1759775, division: "aesthetics" },
  { slug: "implant-delivery", navName: "Tiger Guard\u2122", logo: "/images/tiger-assets/tigerguard.png", logoSize: 47303, packaging: null, packagingSize: 0, location: null, locationSize: 0, division: "aesthetics" },
]

const DIVISIONS: { key: Division; label: string; color: string; slugs: string[] }[] = [
  { key: "wound", label: "Wound Care Solutions", color: "#DF5630", slugs: ["caregraft", "carepatch", "carepac", "completeft", "healpack", "carebox"] },
  { key: "aesthetics", label: "Aesthetic Solutions", color: "#D2A62C", slugs: ["alloclae", "amplifine", "aveli", "bellafill", "expanders", "sientra", "silhouette", "viality", "implant-delivery"] },
]

function formatSize(bytes: number): string {
  if (!bytes) return ""
  const kb = Math.round(bytes / 1024)
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

type PreviewData = { src: string; name: string; slug: string; label: string; size: number }

const EMPTY_LABELS: Record<string, string> = {
  Logo: "Logo Needed",
  Packaging: "Product Needed",
  Location: "Treatment Location Needed",
}

function ImageCell({ src, alt, label, size, slug, onPreview }: {
  src: string | null; alt: string; label: string; size: number; slug: string
  onPreview: (d: PreviewData) => void
}) {
  if (src) {
    return (
      <button
        onClick={() => onPreview({ src, name: alt, slug, label, size })}
        className="relative aspect-[3/2] cursor-pointer w-full"
        style={{ background: "#fbfcff" }}
      >
        <Image src={src} alt={`${alt} ${label}`} fill sizes="(max-width: 640px) 33vw, 250px" className="object-contain p-3 sm:p-5" />
      </button>
    )
  }
  return (
    <div className="relative aspect-[3/2] w-full p-3 sm:p-5" style={{ background: "#fbfcff" }}>
      <div className="w-full h-full rounded-[8px] flex items-center justify-center px-2 text-center" style={{ background: "rgba(35,16,16,0.06)" }}>
        <span className="text-[8px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-light leading-tight" style={{ color: "rgba(35,16,16,0.25)" }}>
          {EMPTY_LABELS[label] || "Needed"}
        </span>
      </div>
    </div>
  )
}

export default function ImageAuditPage() {
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const total = PRODUCTS.length
  const withLogo = PRODUCTS.filter(p => p.logo).length
  const withPackaging = PRODUCTS.filter(p => p.packaging).length
  const withLocation = PRODUCTS.filter(p => p.location).length

  return (
    <div className="min-h-screen" style={{ background: "#EFEDEA" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-[4px] font-light mb-3" style={{ color: "rgba(35,16,16,0.5)" }}>
            Internal
          </div>
          <h1 className="font-light tracking-tight leading-tight" style={{ color: "#231010", fontSize: "clamp(24px,4vw,42px)" }}>
            Brand Asset Audit
          </h1>
          <p className="mt-3 text-[14px] sm:text-[14.6px] font-light leading-[24px] sm:leading-[26px] max-w-2xl" style={{ color: "rgba(35,16,16,0.6)" }}>
            {total} products. Three assets needed per product: brand logo, product packaging, and treatment location.
            Currently {withLogo} logos, {withPackaging} packaging, {withLocation} location.
          </p>
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

              {/* Column Headers — desktop only */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-px mb-2 px-1">
                <div className="text-[9px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>Logo</div>
                <div className="text-[9px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>Packaging</div>
                <div className="text-[9px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>Body Location</div>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {divProducts.map(p => {
                  const logoOk = !!p.logo
                  const packOk = !!p.packaging
                  const locOk = !!p.location
                  const score = [logoOk, packOk, locOk].filter(Boolean).length
                  const assets: { src: string | null; label: string; size: number; dl: string }[] = [
                    { src: p.logo, label: "Logo", size: p.logoSize, dl: `${p.slug}-logo.png` },
                    { src: p.packaging, label: "Packaging", size: p.packagingSize, dl: `${p.slug}-packaging.png` },
                    { src: p.location, label: "Location", size: p.locationSize, dl: `${p.slug}-location.png` },
                  ]

                  return (
                    <div
                      key={p.slug}
                      className="rounded-[12px] border overflow-hidden"
                      style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}
                    >
                      {/* Name + score */}
                      <div className="px-3 sm:px-4 pt-3 pb-1 flex items-center justify-between gap-2">
                        <div className="font-light text-[14px] sm:text-[15px] tracking-tight" style={{ color: "#231010" }}>
                          {p.navName}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-light" style={{ color: score === 3 ? "#0d7a3e" : score >= 1 ? "#a88523" : "rgba(35,16,16,0.35)" }}>
                            {score}/3
                          </span>
                          {score === 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[8px] uppercase tracking-[1.2px] font-light rounded-full border bg-[#0d7a3e]/10 text-[#0d7a3e] border-[#0d7a3e]/25">
                              Complete
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Desktop: three columns side by side */}
                      <div className="hidden sm:grid sm:grid-cols-3 gap-px" style={{ background: "rgba(35,16,16,0.06)" }}>
                        <ImageCell src={p.logo} alt={p.navName} label="Logo" size={p.logoSize} slug={p.slug} onPreview={setPreview} />
                        <ImageCell src={p.packaging} alt={p.navName} label="Packaging" size={p.packagingSize} slug={p.slug} onPreview={setPreview} />
                        <ImageCell src={p.location} alt={p.navName} label="Location" size={p.locationSize} slug={p.slug} onPreview={setPreview} />
                      </div>

                      {/* Mobile: stacked with labels */}
                      <div className="sm:hidden grid gap-px" style={{ background: "rgba(35,16,16,0.06)" }}>
                        {assets.map(a => (
                          <div key={a.label} style={{ background: "#fbfcff" }}>
                            <div className="flex items-center justify-between px-3 pt-2 pb-1">
                              <span className="text-[9px] uppercase tracking-[1.5px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>{a.label}</span>
                              {a.src && (
                                <a href={a.src} download={a.dl} className="inline-flex items-center gap-1 text-[8px] uppercase tracking-[1px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>
                                  <DownloadIcon /> Download
                                </a>
                              )}
                            </div>
                            <ImageCell src={a.src} alt={p.navName} label={a.label} size={a.size} slug={p.slug} onPreview={setPreview} />
                          </div>
                        ))}
                      </div>

                      {/* Desktop download row */}
                      <div className="hidden sm:flex px-4 py-2 items-center justify-between" style={{ borderTop: "1px solid rgba(35,16,16,0.06)" }}>
                        <span className="text-[10px] font-mono" style={{ color: "rgba(35,16,16,0.3)" }}>
                          {[p.logo && formatSize(p.logoSize), p.packaging && formatSize(p.packagingSize), p.location && formatSize(p.locationSize)].filter(Boolean).join(" / ")}
                        </span>
                        <div className="flex gap-1.5">
                          {p.logo && (
                            <a href={p.logo} download={`${p.slug}-logo.png`} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] uppercase tracking-[1px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]" style={{ color: "rgba(35,16,16,0.45)", borderColor: "rgba(35,16,16,0.12)" }}>
                              <DownloadIcon /> Logo
                            </a>
                          )}
                          {p.packaging && (
                            <a href={p.packaging} download={`${p.slug}-packaging.png`} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] uppercase tracking-[1px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]" style={{ color: "rgba(35,16,16,0.45)", borderColor: "rgba(35,16,16,0.12)" }}>
                              <DownloadIcon /> Pkg
                            </a>
                          )}
                          {p.location && (
                            <a href={p.location} download={`${p.slug}-location.png`} className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] uppercase tracking-[1px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]" style={{ color: "rgba(35,16,16,0.45)", borderColor: "rgba(35,16,16,0.12)" }}>
                              <DownloadIcon /> Loc
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Needs Attention */}
        {(() => {
          const incomplete = PRODUCTS.filter(p => !p.logo || !p.packaging || !p.location)
          if (!incomplete.length) return null
          return (
            <div className="mt-10 sm:mt-14 rounded-[12px] border p-4 sm:p-6" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}>
              <h2 className="font-light text-[18px] sm:text-[20px] tracking-tight mb-4 sm:mb-5" style={{ color: "#231010" }}>
                Needs Attention
              </h2>
              <div className="space-y-2">
                {incomplete.map(p => {
                  const divColor = DIVISIONS.find(d => d.slugs.includes(p.slug))?.color || "#231010"
                  const missing: string[] = []
                  if (!p.logo) missing.push("Logo")
                  if (!p.packaging) missing.push("Packaging")
                  if (!p.location) missing.push("Location")
                  return (
                    <div key={p.slug} className="flex items-center gap-2">
                      <div className="rounded-full shrink-0" style={{ width: 5, height: 5, background: divColor }} />
                      <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.65)" }}>
                        {p.navName}
                      </span>
                      <span className="text-[10px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>
                        {missing.join(" + ")}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })()}

        {/* Footer */}
        <div className="mt-8 sm:mt-10 text-center text-[11px] font-light" style={{ color: "rgba(35,16,16,0.35)" }}>
          Internal use only \u2014 Tiger BioSciences Brand Asset Audit \u2014 {total} products \u00D7 3 images each
        </div>
      </div>

      {/* Lightbox */}
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
              <Image src={preview.src} alt={preview.name} fill sizes="(max-width: 640px) 100vw, 512px" className="object-contain p-6" priority />
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-light text-[15px] tracking-tight" style={{ color: "#231010" }}>
                  {preview.name}
                </div>
                <div className="text-[11px] font-mono mt-0.5" style={{ color: "rgba(35,16,16,0.35)" }}>
                  {preview.label} \u2014 {formatSize(preview.size)}
                </div>
              </div>
              <a
                href={preview.src}
                download={`${preview.slug}-${preview.label.toLowerCase().replace(" ", "-")}.png`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[1.5px] font-light rounded-[6px] border shrink-0"
                style={{ color: "#231010", borderColor: "rgba(35,16,16,0.15)", background: "rgba(35,16,16,0.04)" }}
              >
                <DownloadIcon /> Download
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
