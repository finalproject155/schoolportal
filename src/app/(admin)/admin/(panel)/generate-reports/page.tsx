import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const reportTemplates = [
  "Student Enrollment Report",
  "Department Fee Collection Report",
  "Course Registration Summary",
  "Outstanding Payments Report",
]

export default function GenerateReportsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Generate Reports</h2>
        <p className="text-sm text-muted-foreground">Prepare and export admin reports from portal data.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-3 md:p-5">
        <Input type="date" />
        <Input type="date" />
        <Button>Run Report</Button>
      </div>

      <div className="grid gap-3">
        {reportTemplates.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg border p-4">
            <p className="font-medium">{item}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Preview
              </Button>
              <Button size="sm">Export</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}