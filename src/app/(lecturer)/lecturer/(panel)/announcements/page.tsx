"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Course = { id: string; code: string; title: string }
type Announcement = { id: string; title: string; body: string; createdAt: string; course: string | null }

export default function LecturerAnnouncementsPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseId, setCourseId] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [past, setPast] = useState<Announcement[]>([])
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

  function loadAnnouncements() {
    fetch("/api/lecturer/announcements")
      .then((res) => res.json())
      .then((data) => setPast(data.announcements ?? []))
  }

  useEffect(() => {
    fetch("/api/lecturer/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses ?? [])
        if (data.courses?.[0]) setCourseId(data.courses[0].id)
      })
    loadAnnouncements()
  }, [])

  async function publish() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/lecturer/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: courseId || null, title, body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage("✅ Announcement published.")
      setTitle("")
      setBody("")
      loadAnnouncements()
    } catch (error) {
      setMessage(`❌ ${error instanceof Error ? error.message : "Failed to publish."}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Announcements</h2>
        <p className="text-sm text-muted-foreground">Post updates to students enrolled in your courses.</p>
      </div>

      <div className="grid gap-4 rounded-xl border p-4 md:p-5">
        <select
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
          ))}
        </select>
        <Input placeholder="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Write your announcement details..." value={body} onChange={(e) => setBody(e.target.value)} />
        {message && <p className="text-sm font-medium">{message}</p>}
        <div className="flex justify-end gap-2">
          <Button onClick={publish} disabled={saving || !title || !body}>
            {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Past Announcements</h3>
        <div className="grid gap-3">
          {past.length === 0 && <p className="text-sm text-muted-foreground">No announcements yet.</p>}
          {past.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.course ?? "All courses"} · {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
