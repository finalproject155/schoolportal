import { requireLecturerSession } from "@/server/lib/lecturer-auth"
import { getTimetable } from "@/server/modules/lecturers/lecturer-portal.service"

export default async function LecturerTimetablePage() {
  const session = await requireLecturerSession()
  const schedule = await getTimetable(session.id)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Timetable</h2>
        <p className="text-sm text-muted-foreground">Your teaching schedule for this semester.</p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Venue</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={4}>
                  No timetable slots yet.
                </td>
              </tr>
            )}
            {schedule.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3">{item.day}</td>
                <td className="px-4 py-3">{item.startTime} - {item.endTime}</td>
                <td className="px-4 py-3">{item.course}</td>
                <td className="px-4 py-3">{item.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
