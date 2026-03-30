import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const users = [
  { name: "Akin Ade", role: "Student", status: "Active" },
  { name: "Mary James", role: "Lecturer", status: "Active" },
  { name: "Bola Admin", role: "Admin", status: "Suspended" },
]

export default function ManageUserAccountPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage User Account</h2>
        <p className="text-sm text-muted-foreground">Search and manage users across the portal.</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <Input placeholder="Search by name, role, or status" />
        <Button>Search</Button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.name} className="border-t">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.role}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Disable
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}