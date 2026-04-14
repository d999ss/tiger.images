import Image from "next/image"

type Division = "wound" | "aesthetics"
type ImageStatus = "real" | "placeholder" | "missing"

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
  { slug: "carepatch", title: "carePATCH\u00AE", navName: "carePATCH\u00AE", heroImage: "/images/tiger-assets/carepatch.png", division: "wound", fileSize: 249599 },
  { slug: "carepac", title: "carePAC\u2122", navName: "carePAC\u2122", heroImage: "/images/tiger-assets/carepac-logo.png", division: "wound", fileSize: 52778 },
  { slug: "completeft", title: "completeFT\u00AE", navName: "completeFT\u00AE", heroImage: "/images/tiger-assets/completeft.png", division: "wound", fileSize: 43759 },
  { slug: "healpack", title: "HealPACK\u2122", navName: "HealPACK\u2122", heroImage: "/images/tiger-assets/healpack.png", division: "wound", fileSize: 56602 },
  { slug: "alloclae", title: "alloClae\u2122", navName: "alloClae\u2122", heroImage: "/images/tiger-assets/alloclae.png", division: "aesthetics", fileSize: 64123 },
  { slug: "amplifine", title: "Amplifine\u00AE", navName: "Amplifine\u00AE", heroImage: "/images/tiger-assets/amplifine.png", division: "aesthetics", fileSize: 57014 },
  { slug: "aveli", title: "Av\u00E9li\u00AE", navName: "Av\u00E9li\u00AE", heroImage: "/images/tiger-assets/aveli.png", division: "aesthetics", fileSize: 66551 },
  { slug: "bellafill", title: "Bellafill\u00AE", navName: "Bellafill\u00AE", heroImage: "/images/tiger-assets/bellafill-logo.png", division: "aesthetics", fileSize: 47146 },
  { slug: "expanders", title: "Breast Tissue Expanders", navName: "Breast Tissue Expanders", heroImage: "/images/tiger-assets/expanders.png", division: "aesthetics", fileSize: 67795 },
  { slug: "sientra", title: "Sientra\u00AE", navName: "Sientra\u00AE", heroImage: "/images/tiger-assets/sientra.png", division: "aesthetics", fileSize: 56213 },
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

function classifyImage(heroImage: string): ImageStatus {
  if (!heroImage) return "missing"
  if (heroImage.includes("prod-generic-box")) return "placeholder"
  return "real"
}

function formatSize(bytes: number): string {
  const kb = Math.round(bytes / 1024)
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

const IMAGE_STATUS_STYLES: Record<ImageStatus, { label: string; color: string }> = {
  real: { label: "Product Image", color: "bg-[#0d7a3e]/10 text-[#0d7a3e] border-[#0d7a3e]/20" },
  placeholder: { label: "Placeholder", color: "bg-[#D2A62C]/10 text-[#a88523] border-[#D2A62C]/20" },
  missing: { label: "No Image", color: "bg-[#DF5630]/10 text-[#b54426] border-[#DF5630]/20" },
}

export default function ImageAuditPage() {
  const total = PRODUCTS.length
  const realCount = PRODUCTS.filter(p => classifyImage(p.heroImage) === "real").length
  const placeholderCount = PRODUCTS.filter(p => classifyImage(p.heroImage) === "placeholder").length
  const missingCount = PRODUCTS.filter(p => classifyImage(p.heroImage) === "missing").length
  const needsWork = placeholderCount + missingCount
  const pctReady = Math.round((realCount / total) * 100)

  return (
    <div className="min-h-screen" style={{ background: "#EFEDEA" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-[4px] font-light mb-3" style={{ color: "rgba(35,16,16,0.3)" }}>
            Internal
          </div>
          <h1 className="font-light tracking-tight leading-tight" style={{ color: "#231010", fontSize: "clamp(28px,4vw,42px)" }}>
            Product Image Audit
          </h1>
          <p className="mt-3 text-[14.6px] font-light leading-[26px] max-w-2xl" style={{ color: "rgba(35,16,16,0.5)" }}>
            Tracking hero images for the {total} products in the site navigation.
            {needsWork > 0 && ` ${needsWork} product${needsWork === 1 ? "" : "s"} still need${needsWork === 1 ? "s" : ""} real photography.`}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={total} />
          <StatCard label="Ready" value={realCount} accent="#0d7a3e" />
          <StatCard label="Placeholder" value={placeholderCount} accent="#D2A62C" />
          <StatCard label="Missing" value={missingCount} accent="#DF5630" />
        </div>

        {/* Coverage */}
        <div className="mt-6 rounded-[12px] p-5 border" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.05)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] uppercase tracking-[3.15px] font-light" style={{ color: "rgba(35,16,16,0.3)" }}>
              Image Coverage
            </div>
            <div className="text-[13px] font-light" style={{ color: "rgba(35,16,16,0.5)" }}>
              {pctReady}% ready
            </div>
          </div>
          <div className="flex rounded-full overflow-hidden h-2.5" style={{ background: "rgba(35,16,16,0.05)" }}>
            {realCount > 0 && <div style={{ width: `${(realCount / total) * 100}%`, background: "#0d7a3e" }} />}
            {placeholderCount > 0 && <div style={{ width: `${(placeholderCount / total) * 100}%`, background: "#D2A62C" }} />}
            {missingCount > 0 && <div style={{ width: `${(missingCount / total) * 100}%`, background: "#DF5630" }} />}
          </div>
          <div className="flex gap-5 mt-2.5">
            <Legend color="#0d7a3e" label="Ready" count={realCount} />
            <Legend color="#D2A62C" label="Placeholder" count={placeholderCount} />
            <Legend color="#DF5630" label="Missing" count={missingCount} />
          </div>
        </div>

        {/* Divisions */}
        {DIVISIONS.map(div => {
          const divProducts = div.slugs.map(s => PRODUCTS.find(p => p.slug === s)!).filter(Boolean)
          return (
            <div key={div.key} className="mt-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-full" style={{ width: 8, height: 8, background: div.color }} />
                <h2 className="font-light text-[20px] tracking-tight" style={{ color: "#231010" }}>
                  {div.label}
                </h2>
                <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.3)" }}>
                  {divProducts.length} products
                </span>
              </div>

              <div className="grid gap-3">
                {divProducts.map(p => {
                  const imgStatus = classifyImage(p.heroImage)
                  const imgStyle = IMAGE_STATUS_STYLES[imgStatus]

                  return (
                    <div
                      key={p.slug}
                      className="rounded-[12px] border overflow-hidden flex flex-col sm:flex-row"
                      style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.05)" }}
                    >
                      {/* Thumbnail */}
                      <div className="sm:w-[180px] sm:min-h-[120px] relative shrink-0" style={{ background: "rgba(35,16,16,0.02)" }}>
                        <Image
                          src={p.heroImage}
                          alt={p.title}
                          fill
                          sizes="180px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-light text-[15px] tracking-tight" style={{ color: "#231010" }}>
                            {p.navName}
                          </div>
                          <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono" style={{ color: "rgba(35,16,16,0.2)" }}>
                            <span className="truncate">{p.heroImage}</span>
                            <span className="shrink-0">{formatSize(p.fileSize)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] uppercase tracking-[1.5px] font-light rounded-full border ${imgStyle.color}`}>
                            {imgStyle.label}
                          </span>
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
          <div className="mt-14 rounded-[12px] border p-6" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.05)" }}>
            <h2 className="font-light text-[20px] tracking-tight mb-5" style={{ color: "#231010" }}>
              Needs Attention
            </h2>
            <div className="space-y-2">
              {PRODUCTS.filter(p => classifyImage(p.heroImage) !== "real").map(p => {
                const divColor = DIVISIONS.find(d => d.key === p.division)?.color || "#231010"
                return (
                  <div key={p.slug} className="flex items-center gap-2">
                    <div className="rounded-full shrink-0" style={{ width: 5, height: 5, background: divColor }} />
                    <span className="text-[12px] font-light" style={{ color: "rgba(35,16,16,0.5)" }}>
                      {p.navName}
                    </span>
                    <span className="text-[10px] font-light" style={{ color: "rgba(35,16,16,0.2)" }}>
                      {classifyImage(p.heroImage) === "placeholder" ? "Placeholder" : "Missing"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-[11px] font-light" style={{ color: "rgba(35,16,16,0.15)" }}>
          Internal use only \u2014 Tiger BioSciences Product Image Audit \u2014 {total} nav products
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-[12px] border p-4" style={{ background: "#fbfcff", borderColor: "rgba(35,16,16,0.05)" }}>
      <div className="text-[10px] uppercase tracking-[2px] font-light mb-1.5" style={{ color: "rgba(35,16,16,0.3)" }}>{label}</div>
      <div className="text-[26px] font-light tracking-tight" style={{ color: accent || "#231010" }}>
        {value}
      </div>
    </div>
  )
}

function Legend({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="rounded-full" style={{ width: 5, height: 5, background: color }} />
      <span className="text-[11px] font-light" style={{ color: "rgba(35,16,16,0.35)" }}>
        {label} ({count})
      </span>
    </div>
  )
}
