const statCards = [
  { label: "Total Students", value: "5,240" },
  { label: "Registered This Session", value: "4,612" },
  { label: "Pending Registration", value: "628" },
  { label: "Departments Updated", value: "18" },
]

export default function ViewRegistrationStatPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">View Registration Stat</h2>
        <p className="text-sm text-muted-foreground">Quick overview of current registration activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <div key={item.label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border p-5">
        <h3 className="mb-3 font-semibold">Registration Distribution (Template)</h3>
        <div className="space-y-3">
          {[75, 62, 48, 88].map((value, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-xs text-muted-foreground">Level {idx + 1}00</p>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}