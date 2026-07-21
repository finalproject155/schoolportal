import Link from "next/link"
import { cookies } from "next/headers"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/components/LogoutButton"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session"

const links = [
  { href: "/lecturer", label: "Dashboard" },
  { href: "/lecturer/my-courses", label: "My Courses" },
  { href: "/lecturer/students", label: "Students" },
  { href: "/lecturer/attendance", label: "Attendance" },
  { href: "/lecturer/grades", label: "Grades & Results" },
  { href: "/lecturer/course-materials", label: "Course Materials" },
  { href: "/lecturer/timetable", label: "Timetable" },
  { href: "/lecturer/announcements", label: "Announcements" },
  { href: "/lecturer/profile", label: "Profile" },
]

export default async function LecturerPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const session = sessionToken ? await verifySessionToken(sessionToken) : null

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">
                {session ? `Welcome, ${session.firstName}` : "Lecturer Portal"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {session ? `${session.email} · Staff ID: ${session.matric}` : "Course & Student Management"}
              </p>
            </div>
          </div>

          <LogoutButton redirectTo="/lecturer/login" />
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
