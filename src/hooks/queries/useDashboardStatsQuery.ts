import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '@/services/dashboard.service'

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 60_000,
  })
}
