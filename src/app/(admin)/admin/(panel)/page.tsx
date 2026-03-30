import Link from "next/link"
import { Button } from "@/components/ui/button"

const cards = [
  { title: "Manage User Account", href: "/admin/manage-user-account" },
  { title: "Create Student User", href: "/admin/create-student-user" },
  { title: "Manage Course Offering", href: "/admin/manage-course-offering" },
  { title: "Publish Announcement", href: "/admin/publish-announcement" },
  { title: "View Registration Stat", href: "/admin/view-registration-stat" },
  { title: "Manage Fee Records", href: "/admin/manage-fee-records" },
  { title: "Generate Reports", href: "/admin/generate-reports" },
]

export default function AdminHomePage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Welcome, Admin</h2>
        <p className="text-sm text-muted-foreground">Choose a section to continue.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((item) => (
          <div key={item.href} className="rounded-xl border p-4">
            <h3 className="mb-3 font-semibold">{item.title}</h3>
            <Button asChild size="sm">
              <Link href={item.href}>Open</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}