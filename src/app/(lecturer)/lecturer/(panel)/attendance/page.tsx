"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Course = { id: string; code: string; title: string }
type RosterRow = { studentId: string; matric: string; name: string; status: string }

export default function AttendancePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseId, setCourseId] = useState("")
  const [roster, setRoster] = useState<RosterRow[]>([])
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    fetch("/api/lecturer/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses ?? [])
        if (data.courses?.[0]) setCourseId(data.courses[0].id)
      })
  }, [])

  useEffect(() => {
    if (!courseId) return
    fetch(`/api/lecturer/attendance?courseId=${courseId}&date=${today}`)
      .then((res) => res.json())
      .then((data) => setRoster(data.roster ?? []))
  }, [courseId, today])

  function setStatus(studentId: string, status: string) {
    setRoster((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)))
  }

  async function save() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/lecturer/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          sessionDate: today,
          entries: roster.map((r) => ({ studentId: r.studentId, status: r.status })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage("✅ Attendance saved.")
    } catch (error) {
      setMessage(`❌ ${error instanceof Error ? error.message : "Failed to save."}`)
    } finally {
      setSaving(false)
    }
  }

  const selectedCourse = courses.find((c) => c.id === courseId)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Mark today&apos;s attendance{selectedCourse ? ` for ${selectedCourse.code} — ${selectedCourse.title}` : ""}.
        </p>
      </div>

      <select
        className="w-full max-w-sm rounded-md border bg-background px-3 py-2 text-sm"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        {courses.map((c) => (
          <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
        ))}
      </select>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Present</th>
              <th className="px-4 py-3">Absent</th>
            </tr>
          </thead>
          <tbody>
            {roster.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={4}>No students enrolled.</td>
              </tr>
            )}
            {roster.map((item) => (
              <tr key={item.studentId} className="border-t">
                <td className="px-4 py-3">{item.matric}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">
                  <input
                    type="radio"
                    name={`att-${item.studentId}`}
                    checked={item.status === "present"}
                    onChange={() => setStatus(item.studentId, "present")}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="radio"
                    name={`att-${item.studentId}`}
                    checked={item.status === "absent"}
                    onChange={() => setStatus(item.studentId, "absent")}
                    className="h-4 w-4"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="text-sm font-medium">{message}</p>}

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving || !roster.length}>
          {saving ? "Saving..." : "Save Attendance"}
        </Button>
      </div>
    </section>
  )
}
