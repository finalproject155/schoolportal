import { AdminSidebar } from "@/components/admin-sidebar"
import LogoutButton from "@/components/LogoutButton"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <h1 className="text-sm font-semibold">Admin Console</h1>
              <p className="text-xs text-muted-foreground">School Portal Management</p>
            </div>
          </div>

          <LogoutButton redirectTo="/admin/login" />
        </header>

        <main className="m-4 flex-1 rounded-xl border bg-card p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
