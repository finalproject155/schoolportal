import { cn } from "@/lib/utils"

export function ChartCard({
  title,
  description,
  action,
  className,
  children,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-4 md:p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
