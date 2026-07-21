"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Course = { id: string; code: string; title: string }
type GradeRow = { studentId: string; matric: string; name: string; ca: number; exam: number }

function toGrade(total: number) {
  if (total >= 70) return "A"
  if (total >= 60) return "B"
  if (total >= 50) return "C"
  if (total >= 45) return "D"
  return "F"
}

export default function GradesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseId, setCourseId] = useState("")
  const [rows, setRows] = useState<GradeRow[]>([])
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

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
    fetch(`/api/lecturer/grades?courseId=${courseId}`)
      .then((res) => res.json())
      .then((data) => setRows(data.rows ?? []))
  }, [courseId])

  function updateRow(studentId: string, field: "ca" | "exam", value: number) {
    setRows((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, [field]: value } : r)))
  }

  async function save() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/lecturer/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          entries: rows.map((r) => ({ studentId: r.studentId, ca: r.ca, exam: r.exam })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage("✅ Results submitted.")
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
        <h2 className="text-2xl font-bold">Grades & Results</h2>
        <p className="text-sm text-muted-foreground">
          Enter CA and exam scores{selectedCourse ? ` for ${selectedCourse.code} — ${selectedCourse.title}` : ""}.
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
              <th className="px-4 py-3">CA (30)</th>
              <th className="px-4 py-3">Exam (70)</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-muted-foreground" colSpan={6}>No students enrolled.</td>
              </tr>
            )}
            {rows.map((item) => (
              <tr key={item.studentId} className="border-t">
                <td className="px-4 py-3">{item.matric}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={item.ca}
                    onChange={(e) => updateRow(item.studentId, "ca", Number(e.target.value))}
                    className="w-20"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={item.exam}
                    onChange={(e) => updateRow(item.studentId, "exam", Number(e.target.value))}
                    className="w-20"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{item.ca + item.exam}</td>
                <td className="px-4 py-3 font-medium">{toGrade(item.ca + item.exam)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="text-sm font-medium">{message}</p>}

      <div className="flex justify-end gap-2">
        <Button onClick={save} disabled={saving || !rows.length}>
          {saving ? "Saving..." : "Submit Results"}
        </Button>
      </div>
    </section>
  )
}
