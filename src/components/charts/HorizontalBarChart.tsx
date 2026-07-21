"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export type BarDatum = { label: string; value: number }

export function HorizontalBarChart({
  data,
  className,
  seriesColor = "var(--dv-series-1)",
  valueFormatter = (v: number) => v.toLocaleString(),
  maxBars = 8,
}: {
  data: BarDatum[]
  className?: string
  seriesColor?: string
  valueFormatter?: (value: number) => string
  maxBars?: number
}) {
  const [hovered, setHovered] = useState<number | null>(null)

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No data yet.</p>
  }

  const sorted = [...data].sort((a, b) => b.value - a.value)
  const visible = sorted.slice(0, maxBars)
  const overflow = sorted.slice(maxBars)
  const overflowTotal = overflow.reduce((sum, d) => sum + d.value, 0)

  const rows = overflow.length > 0 ? [...visible, { label: `Other (${overflow.length})`, value: overflowTotal }] : visible
  const max = Math.max(1, ...rows.map((d) => d.value))

  return (
    <div className={cn("space-y-3", className)}>
      {rows.map((d, i) => {
        const pct = (d.value / max) * 100
        const isHovered = hovered === i

        return (
          <div key={d.label} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span className="truncate text-[var(--dv-text-secondary)]">{d.label}</span>
              <span
                className={cn(
                  "shrink-0 font-medium tabular-nums text-[var(--dv-text-primary)] transition-opacity",
                  isHovered ? "opacity-100" : "opacity-80",
                )}
              >
                {valueFormatter(d.value)}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--dv-grid)]">
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${Math.max(pct, 2)}%`,
                  backgroundColor: seriesColor,
                  opacity: isHovered ? 1 : 0.85,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
