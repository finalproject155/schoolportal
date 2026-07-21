"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Course = { id: string; code: string; title: string }
type Material = { id: string; title: string; type: string; fileUrl: string | null; course: string | null }

export default function CourseMaterialsPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseId, setCourseId] = useState("")
  const [title, setTitle] = useState("")
  const [materials, setMaterials] = useState<Material[]>([])
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)

  function loadMaterials() {
    fetch("/api/lecturer/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data.materials ?? []))
  }

  useEffect(() => {
    fetch("/api/lecturer/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses ?? [])
        if (data.courses?.[0]) setCourseId(data.courses[0].id)
      })
    loadMaterials()
  }, [])

  async function upload() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/lecturer/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, title, materialType: "PDF" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage("✅ Material added.")
      setTitle("")
      loadMaterials()
    } catch (error) {
      setMessage(`❌ ${error instanceof Error ? error.message : "Failed to add."}`)
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    await fetch(`/api/lecturer/materials?id=${id}`, { method: "DELETE" })
    loadMaterials()
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Course Materials</h2>
        <p className="text-sm text-muted-foreground">Upload and manage materials shared with your students.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-4 md:p-5">
        <select
          className="rounded-md border bg-background px-3 py-2 text-sm"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.code}</option>
          ))}
        </select>
        <Input placeholder="Material Title" value={title} onChange={(e) => setTitle(e.target.value)} className="md:col-span-2" />
        <Button onClick={upload} disabled={saving || !title || !courseId}>
          {saving ? "Adding..." : "Upload"}
        </Button>
      </div>

      {message && <p className="text-sm font-medium">{message}</p>}

      <div className="grid gap-3">
        {materials.length === 0 && <p className="text-sm text-muted-foreground">No materials uploaded yet.</p>}
        {materials.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.course} · {item.type}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="destructive" onClick={() => remove(item.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
