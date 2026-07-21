import Link from "next/link"
import { Button } from "@/components/ui/button"
import { requireLecturerSession } from "@/server/lib/lecturer-auth"
import { getLecturerCourses } from "@/server/modules/lecturers/lecturer-portal.service"

export default async function MyCoursesPage() {
  const session = await requireLecturerSession()
  const courses = await getLecturerCourses(session.id)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Courses</h2>
        <p className="text-sm text-muted-foreground">Courses assigned to you this session.</p>
      </div>

      <div className="grid gap-3">
        {courses.length === 0 && (
          <p className="text-sm text-muted-foreground">No courses assigned yet.</p>
        )}
        {courses.map((item) => (
          <div key={item.id} className="flex flex-col justify-between gap-3 rounded-lg border p-4 md:flex-row md:items-center">
            <div>
              <p className="font-semibold">{item.code} — {item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.students} students enrolled · {item.level}L · {item.semester} semester
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/lecturer/students">View Students</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={`/lecturer/grades?courseId=${item.id}`}>Manage</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
