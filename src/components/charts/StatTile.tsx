import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatTile({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-4 rounded-xl border bg-card p-4", className)}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
      </div>
    </div>
  )
}
