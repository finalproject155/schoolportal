import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const courses = [
  { code: "CSC401", title: "Software Engineering", semester: "Rain" },
  { code: "CSC403", title: "Computer Security", semester: "Harmattan" },
]

export default function ManageCourseOfferingPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Course Offering</h2>
        <p className="text-sm text-muted-foreground">Create and maintain departmental course offerings.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Input placeholder="Course Code" />
        <Input placeholder="Course Title" />
        <Input placeholder="Semester" />
        <Button>Add Course</Button>
      </div>

      <div className="grid gap-3">
        {courses.map((item) => (
          <div key={item.code} className="flex flex-col justify-between gap-3 rounded-lg border p-4 md:flex-row md:items-center">
            <div>
              <p className="font-semibold">{item.code}</p>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{item.semester}</span>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}