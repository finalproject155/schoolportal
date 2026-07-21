"use client"

import { RefreshCw, Users, GraduationCap, Building2, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { StatTile } from "@/components/charts/StatTile"
import { ChartCard } from "@/components/charts/ChartCard"
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { TrendChart } from "@/components/charts/TrendChart"
import { useDashboardStatsQuery } from "@/hooks/queries/useDashboardStatsQuery"

const GENDER_COLORS: Record<string, string> = {
  male: "var(--dv-series-1)",
  female: "var(--dv-series-3)",
}

export default function AdminDashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardStatsQuery()

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Live snapshot of students, lecturers, and registrations.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isError && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load dashboard data."}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[76px] rounded-xl" />)
        ) : (
          <>
            <StatTile label="Total Students" value={(data?.totalStudents ?? 0).toLocaleString()} icon={Users} />
            <StatTile
              label="Total Lecturers"
              value={(data?.totalLecturers ?? 0).toLocaleString()}
              icon={GraduationCap}
            />
            <StatTile label="Departments" value={data?.totalDepartments ?? 0} icon={Building2} />
            <StatTile label="Faculties" value={data?.totalFaculties ?? 0} icon={Layers} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="New Registrations" description="Students registered per month, last 12 months">
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <TrendChart data={(data?.registrationsByMonth ?? []).map((m) => ({ label: m.label, value: m.count }))} />
          )}
        </ChartCard>

        <ChartCard title="Students by Gender" description="Distribution across the student body">
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <DonutChart
              centerLabel="Students"
              data={(data?.studentsByGender ?? []).map((g, i) => ({
                label: g.label,
                value: g.count,
                color: GENDER_COLORS[g.label.toLowerCase()] ?? `var(--dv-series-${(i % 4) + 1})`,
              }))}
            />
          )}
        </ChartCard>

        <ChartCard title="Students by Department" description="Enrollment across departments">
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <HorizontalBarChart
              data={(data?.studentsByDepartment ?? []).map((d) => ({ label: d.label, value: d.count }))}
            />
          )}
        </ChartCard>

        <ChartCard title="Students by Level" description="Enrollment across academic levels">
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <HorizontalBarChart
              seriesColor="var(--dv-series-2)"
              data={(data?.studentsByLevel ?? []).map((d) => ({ label: d.label, value: d.count }))}
            />
          )}
        </ChartCard>

        <ChartCard
          title="Lecturers by Department"
          description="Staffing distribution across departments"
          className="lg:col-span-2"
        >
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <HorizontalBarChart
              seriesColor="var(--dv-series-4)"
              data={(data?.lecturersByDepartment ?? []).map((d) => ({ label: d.label, value: d.count }))}
            />
          )}
        </ChartCard>
      </div>
    </section>
  )
}
