"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/utils"

export type TrendDatum = { label: string; value: number }

export function TrendChart({
  data,
  className,
  color = "var(--dv-series-1)",
}: {
  data: TrendDatum[]
  className?: string
  color?: string
}) {
  const gradientId = useId()
  const [hovered, setHovered] = useState<number | null>(null)

  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No data yet.</p>
  }

  const width = 560
  const height = 200
  const paddingX = 8
  const paddingTop = 16
  const paddingBottom = 24

  const max = Math.max(1, ...data.map((d) => d.value))
  const stepX = data.length > 1 ? (width - paddingX * 2) / (data.length - 1) : 0

  const points = data.map((d, i) => {
    const x = paddingX + i * stepX
    const y = paddingTop + (1 - d.value / max) * (height - paddingTop - paddingBottom)
    return { ...d, x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const baselineY = height - paddingBottom
  const areaPath = `${linePath} L${points[points.length - 1].x},${baselineY} L${points[0].x},${baselineY} Z`
  const gridLines = [0.25, 0.5, 0.75, 1]

  return (
    <div className={cn("relative w-full", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        {gridLines.map((g) => {
          const y = paddingTop + g * (height - paddingTop - paddingBottom)
          return <line key={g} x1={paddingX} x2={width - paddingX} y1={y} y2={y} stroke="var(--dv-grid)" strokeWidth={1} />
        })}

        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        <line x1={paddingX} x2={width - paddingX} y1={baselineY} y2={baselineY} stroke="var(--dv-baseline)" strokeWidth={1} />

        {points.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hovered === i ? 4 : 3}
              fill={color}
              stroke="var(--dv-surface)"
              strokeWidth={2}
              className="transition-[r]"
            />
            <rect
              x={p.x - stepX / 2}
              y={paddingTop}
              width={Math.max(stepX, 1)}
              height={height - paddingTop - paddingBottom}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          </g>
        ))}
      </svg>

      <div className="mt-1 flex justify-between px-1 text-[11px] text-[var(--dv-text-secondary)]">
        {points.map((p, i) => (
          <span key={p.label} className={cn(data.length > 8 && i % 2 === 1 ? "hidden sm:inline" : undefined)}>
            {p.label}
          </span>
        ))}
      </div>

      {hovered !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border bg-[var(--dv-surface)] px-2 py-1 text-xs shadow-sm"
          style={{
            left: `${(points[hovered].x / width) * 100}%`,
            top: `${(points[hovered].y / height) * 100}%`,
          }}
        >
          <p className="font-medium text-[var(--dv-text-primary)]">{points[hovered].value.toLocaleString()}</p>
          <p className="text-[var(--dv-text-secondary)]">{points[hovered].label}</p>
        </div>
      )}
    </div>
  )
}
