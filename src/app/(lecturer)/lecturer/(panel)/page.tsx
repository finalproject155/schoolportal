import Link from "next/link"
import { Button } from "@/components/ui/button"
import { requireLecturerSession } from "@/server/lib/lecturer-auth"
import { getLecturerCourses, getLecturerStudents } from "@/server/modules/lecturers/lecturer-portal.service"

const cards = [
  { title: "My Courses", href: "/lecturer/my-courses" },
  { title: "Students", href: "/lecturer/students" },
  { title: "Attendance", href: "/lecturer/attendance" },
  { title: "Grades & Results", href: "/lecturer/grades" },
  { title: "Course Materials", href: "/lecturer/course-materials" },
  { title: "Timetable", href: "/lecturer/timetable" },
  { title: "Announcements", href: "/lecturer/announcements" },
  { title: "Profile", href: "/lecturer/profile" },
]

export default async function LecturerHomePage() {
  const session = await requireLecturerSession()
  const [courses, students] = await Promise.all([
    getLecturerCourses(session.id),
    getLecturerStudents(session.id),
  ])

  const uniqueStudents = new Set(students.map((s) => s.matric)).size

  const statCards = [
    { label: "Courses This Semester", value: String(courses.length) },
    { label: "Total Students", value: String(uniqueStudents) },
    { label: "Course Units Assigned", value: String(courses.length) },
    { label: "Timetable Entries", value: String(courses.length ? courses.length : 0) },
  ]

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {session.firstName}</h2>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening across your courses.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <div key={item.label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Quick Actions</h3>
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
      </div>
    </section>
  )
}
