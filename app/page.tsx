"use client"

import Image from "next/image"
import { useState } from "react"

type Division = "wound" | "aesthetics"
type ImageStatus = "real" | "needs-review" | "missing"

interface Product {
  slug: string
  navName: string
  logo: string
  logoSize: number
  productImage: string | null
  productImageSize: number
  division: Division
}

const PRODUCTS: Product[] = [
  { slug: "caregraft", navName: "caregraFT\u2122", logo: "/images/tiger-assets/caregraft.png", logoSize: 84052, productImage: null, productImageSize: 0, division: "wound" },
  { slug: "carepatch", navName: "carePATCH\u00AE", logo: "/images/tiger-assets/carepatch.png", logoSize: 41669, productImage: "/images/products/carepatch.png", productImageSize: 249599, division: "wound" },
  { slug: "carepac", navName: "carePAC\u2122", logo: "/images/tiger-assets/carepac-logo.png", logoSize: 52778, productImage: "/images/products/carepac.png", productImageSize: 511005, division: "wound" },
  { slug: "completeft", navName: "completeFT\u00AE", logo: "/images/tiger-assets/completeft.png", logoSize: 43759, productImage: null, productImageSize: 0, division: "wound" },
  { slug: "healpack", navName: "HealPACK\u2122", logo: "/images/tiger-assets/healpack.png", logoSize: 56602, productImage: "/images/products/healpack.png", productImageSize: 300114, division: "wound" },
  { slug: "alloclae", navName: "alloClae\u2122", logo: "/images/tiger-assets/alloclae.png", logoSize: 38761, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "amplifine", navName: "Amplifine\u00AE", logo: "/images/tiger-assets/amplifine.png", logoSize: 57014, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "aveli", navName: "Av\u00E9li\u00AE", logo: "/images/tiger-assets/aveli.png", logoSize: 66551, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "bellafill", navName: "Bellafill\u00AE", logo: "/images/tiger-assets/bellafill-logo.png", logoSize: 47146, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "expanders", navName: "Breast Tissue Expanders", logo: "/images/tiger-assets/expanders.png", logoSize: 67795, productImage: "/images/products/expanders.png", productImageSize: 85842, division: "aesthetics" },
  { slug: "sientra", navName: "Sientra\u00AE", logo: "/images/tiger-assets/sientra.png", logoSize: 37579, productImage: "/images/products/sientra.png", productImageSize: 1166397, division: "aesthetics" },
  { slug: "viality", navName: "Viality\u00AE", logo: "/images/tiger-assets/viality.png", logoSize: 57896, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "implant-delivery", navName: "Tiger Guard\u2122", logo: "/images/tiger-assets/tigerguard.png", logoSize: 47303, productImage: null, productImageSize: 0, division: "aesthetics" },
  { slug: "retractor", navName: "Tiger View\u2122", logo: "/images/figma/prod-generic-box-aesthetics.png", logoSize: 264510, productImage: null, productImageSize: 0, division: "aesthetics" },
]

const DIVISIONS: { key: Division; label: string; color: string; slugs: string[] }[] = [
  { key: "wound", label: "Wound Care Solutions", color: "#DF5630", slugs: ["caregraft", "carepatch", "carepac", "completeft", "healpack"] },
  { key: "aesthetics", label: "Aesthetic Solutions", color: "#D2A62C", slugs: ["alloclae", "amplifine", "aveli", "bellafill", "expanders", "sientra", "viality", "implant-delivery", "retractor"] },
]

const NEEDS_REVIEW_SLUGS = ["expanders", "retractor"]

function classifyLogo(slug: string, logo: string): ImageStatus {
  if (!logo) return "missing"
  if (NEEDS_REVIEW_SLUGS.includes(slug)) return "needs-review"
  if (logo.includes("prod-generic-box")) return "needs-review"
  return "real"
}

function formatSize(bytes: number): string {
  if (!bytes) return ""
  const kb = Math.round(bytes / 1024)
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

const LOGO_STATUS: Record<ImageStatus, { label: string; cls: string }> = {
  real: { label: "Brand Logo", cls: "bg-[#0d7a3e]/10 text-[#0d7a3e] border-[#0d7a3e]/25" },
  "needs-review": { label: "No Logo Found", cls: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/25" },
  missing: { label: "No Image", cls: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/25" },
}

type PreviewData = { src: string; name: string; slug: string; label: string; size: number }

export default function ImageAuditPage() {
  const [preview, setPreview] = useState<PreviewData | null>(null)
  const total = PRODUCTS.length
  const withLogo = PRODUCTS.filter(p => classifyLogo(p.slug, p.logo) === "real").length
  const withProduct = PRODUCTS.filter(p => p.productImage).length

  return (
    <div className="min-h-screen" style={{ background: "#EFEDEA" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-[4px] font-light mb-3" style={{ color: "rgba(35,16,16,0.5)" }}>
            Internal
          </div>
          <h1 className="font-light tracking-tight leading-tight" style={{ color: "#231010", fontSize: "clamp(24px,4vw,42px)" }}>
            Packaging Audit
          </h1>
          <p className="mt-3 text-[14px] sm:text-[14.6px] font-light leading-[24px] sm:leading-[26px] max-w-2xl" style={{ color: "rgba(35,16,16,0.6)" }}>
            {total} products in the site navigation. {withLogo} have brand logos, {withProduct} have product images.
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

              {/* Column Headers */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_1fr] gap-3 mb-2 px-1">
                <div className="text-[9px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>Brand Logo</div>
                <div className="text-[9px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>Packaging</div>
              </div>

              <div className="grid gap-2 sm:gap-3">
                {divProducts.map(p => {
                  const logoStatus = classifyLogo(p.slug, p.logo)
                  const logoStyle = LOGO_STATUS[logoStatus]
                  const hasProduct = !!p.productImage

                  return (
                    <div
                      key={p.slug}
                      className="rounded-[12px] border overflow-hidden"
                      style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}
                    >
                      {/* Product name bar */}
                      <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-2">
                        <div className="font-light text-[14px] sm:text-[15px] tracking-tight" style={{ color: "#231010" }}>
                          {p.navName}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] font-light rounded-full border ${logoStyle.cls}`}>
                            {logoStyle.label}
                          </span>
                          {hasProduct && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] font-light rounded-full border bg-[#0d7a3e]/10 text-[#0d7a3e] border-[#0d7a3e]/25">
                              Packaging
                            </span>
                          )}
                          {!hasProduct && (
                            <span className="inline-flex items-center px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] font-light rounded-full border bg-[#D2A62C]/10 text-[#a88523] border-[#D2A62C]/25">
                              No Packaging
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Two image columns */}
                      <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(35,16,16,0.06)" }}>
                        {/* Logo */}
                        <button
                          onClick={() => setPreview({ src: p.logo, name: p.navName, slug: p.slug, label: "Brand Logo", size: p.logoSize })}
                          className="relative aspect-[3/2] cursor-pointer"
                          style={{ background: "#fbfcff" }}
                        >
                          <Image src={p.logo} alt={`${p.navName} logo`} fill sizes="(max-width: 640px) 50vw, 300px" className="object-contain p-4 sm:p-6" />
                        </button>

                        {/* Packaging */}
                        {hasProduct ? (
                          <button
                            onClick={() => setPreview({ src: p.productImage!, name: p.navName, slug: p.slug, label: "Packaging", size: p.productImageSize })}
                            className="relative aspect-[3/2] cursor-pointer"
                            style={{ background: "#fbfcff" }}
                          >
                            <Image src={p.productImage!} alt={`${p.navName} product`} fill sizes="(max-width: 640px) 50vw, 300px" className="object-contain p-4 sm:p-6" />
                          </button>
                        ) : (
                          <div className="relative aspect-[3/2] flex items-center justify-center" style={{ background: "rgba(35,16,16,0.06)" }}>
                            <span className="text-[10px] uppercase tracking-[2px] font-light" style={{ color: "rgba(35,16,16,0.3)" }}>Needed</span>
                          </div>
                        )}
                      </div>

                      {/* Download row */}
                      <div className="px-4 py-2 flex items-center justify-between" style={{ borderTop: "1px solid rgba(35,16,16,0.06)" }}>
                        <span className="text-[10px] font-mono" style={{ color: "rgba(35,16,16,0.35)" }}>
                          {formatSize(p.logoSize)}{hasProduct ? ` / ${formatSize(p.productImageSize)}` : ""}
                        </span>
                        <div className="flex gap-2">
                          <a
                            href={p.logo}
                            download={`${p.slug}-logo.png`}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]"
                            style={{ color: "rgba(35,16,16,0.5)", borderColor: "rgba(35,16,16,0.12)" }}
                          >
                            <DownloadIcon /> Logo
                          </a>
                          {hasProduct && (
                            <a
                              href={p.productImage!}
                              download={`${p.slug}-product.png`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[1.2px] font-light rounded-full border transition-colors hover:border-[rgba(35,16,16,0.3)] hover:text-[#231010]"
                              style={{ color: "rgba(35,16,16,0.5)", borderColor: "rgba(35,16,16,0.12)" }}
                            >
                              <DownloadIcon /> Product
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
          const missing = PRODUCTS.filter(p => classifyLogo(p.slug, p.logo) !== "real" || !p.productImage)
          if (!missing.length) return null
          return (
            <div className="mt-10 sm:mt-14 rounded-[12px] border p-4 sm:p-6" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.08)" }}>
              <h2 className="font-light text-[18px] sm:text-[20px] tracking-tight mb-4 sm:mb-5" style={{ color: "#231010" }}>
                Needs Attention
              </h2>
              <div className="space-y-2">
                {missing.map(p => {
                  const divColor = DIVISIONS.find(d => d.key === p.division)?.color || "#231010"
                  const issues: string[] = []
                  if (classifyLogo(p.slug, p.logo) !== "real") issues.push("No Logo")
                  if (!p.productImage) issues.push("No Packaging")
                  return (
                    <div key={p.slug} className="flex items-center gap-2">
                      <div className="rounded-full shrink-0" style={{ width: 5, height: 5, background: divColor }} />
                      <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.65)" }}>
                        {p.navName}
                      </span>
                      <span className="text-[10px] font-light" style={{ color: "rgba(35,16,16,0.4)" }}>
                        {issues.join(" + ")}
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
          Internal use only \u2014 Tiger BioSciences Packaging Audit \u2014 {total} nav products
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
