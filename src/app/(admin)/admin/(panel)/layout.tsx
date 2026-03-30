import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/admin/manage-user-account", label: "Manage User Account" },
  { href: "/admin/create-student-user", label: "Create Student User" },
  { href: "/admin/manage-course-offering", label: "Manage Course Offering" },
  { href: "/admin/publish-announcement", label: "Publish Announcement" },
  { href: "/admin/view-registration-stat", label: "View Registration Stat" },
  { href: "/admin/manage-fee-records", label: "Manage Fee Records" },
  { href: "/admin/generate-reports", label: "Generate Reports" },
]

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Admin Console</h1>
              <p className="text-xs text-muted-foreground">School Portal Management</p>
            </div>
          </div>

          <Button asChild variant="outline">
            <Link href="/admin/login">Logout</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border bg-card p-4">
          <nav className="grid gap-2">
            {links.map((item) => (
              <Button key={item.href} asChild variant="ghost" className="justify-start">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </aside>

        <main className="rounded-xl border bg-card p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}