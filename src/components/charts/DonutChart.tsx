"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export type DonutDatum = { label: string; value: number; color: string }

export function DonutChart({
  data,
  className,
  centerLabel = "Total",
}: {
  data: DonutDatum[]
  className?: string
  centerLabel?: string
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const total = data.reduce((sum, d) => sum + d.value, 0)

  const size = 160
  const radius = 60
  const strokeWidth = 22
  const circumference = 2 * Math.PI * radius
  const gapLen = data.length > 1 ? 3 : 0

  const segments = useMemo(() => {
    return data.reduce<{ rows: Array<DonutDatum & { dash: number; gap: number; rotation: number; fraction: number; index: number }>; acc: number }>(
      (state, d, i) => {
        const fraction = total > 0 ? d.value / total : 0
        const dash = Math.max(fraction * circumference - gapLen, 0)
        const gap = circumference - dash
        const rotation = total > 0 ? (state.acc / total) * 360 : 0
        return {
          acc: state.acc + d.value,
          rows: [...state.rows, { ...d, dash, gap, rotation, fraction, index: i }],
        }
      },
      { rows: [], acc: 0 },
    ).rows
  }, [data, total, circumference, gapLen])

  if (total === 0) {
    return <p className="text-sm text-muted-foreground">No data yet.</p>
  }

  return (
    <div className={cn("flex flex-col items-center gap-5 sm:flex-row", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--dv-grid)" strokeWidth={strokeWidth} />
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={-((s.rotation / 360) * circumference)}
              className="cursor-pointer transition-opacity"
              style={{ opacity: hovered === null || hovered === s.index ? 1 : 0.35 }}
              onMouseEnter={() => setHovered(s.index)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold tabular-nums text-[var(--dv-text-primary)]">
            {(hovered !== null ? segments[hovered].value : total).toLocaleString()}
          </span>
          <span className="text-[11px] text-[var(--dv-text-secondary)]">
            {hovered !== null ? segments[hovered].label : centerLabel}
          </span>
        </div>
      </div>

      <ul className="grid w-full gap-2 text-sm">
        {segments.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2"
            onMouseEnter={() => setHovered(s.index)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="truncate text-[var(--dv-text-secondary)]">{s.label}</span>
            <span className="ml-auto shrink-0 font-medium tabular-nums text-[var(--dv-text-primary)]">
              {Math.round(s.fraction * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
