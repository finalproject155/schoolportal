import { requireLecturerSession } from "@/server/lib/lecturer-auth"
import { getLecturerStudents } from "@/server/modules/lecturers/lecturer-portal.service"

export default async function LecturerStudentsPage() {
  const session = await requireLecturerSession()
  const students = await getLecturerStudents(session.id)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Students</h2>
        <p className="text-sm text-muted-foreground">Students enrolled across your courses.</p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Course</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={3}>
                  No students enrolled yet.
                </td>
              </tr>
            )}
            {students.map((item) => (
              <tr key={`${item.matric}-${item.courseId}`} className="border-t">
                <td className="px-4 py-3">{item.matric}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
