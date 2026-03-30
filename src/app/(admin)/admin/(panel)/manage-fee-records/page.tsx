import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const feeRows = [
  { matric: "2021001710", name: "John Ade", paid: "₦120,000", status: "Paid" },
  { matric: "2021001711", name: "Grace Ola", paid: "₦80,000", status: "Partly Paid" },
  { matric: "2021001712", name: "Mike Sam", paid: "₦0", status: "Unpaid" },
]

export default function ManageFeeRecordsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Fee Records</h2>
        <p className="text-sm text-muted-foreground">Track student payment status and update fee records.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input placeholder="Search by matric number" />
        <Input placeholder="Search by student name" />
        <Button>Filter</Button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Amount Paid</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeRows.map((item) => (
              <tr key={item.matric} className="border-t">
                <td className="px-4 py-3">{item.matric}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.paid}</td>
                <td className="px-4 py-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}