import { requireLecturerSession } from "@/server/lib/lecturer-auth"
import ProfileForms from "./ProfileForms"

export default async function LecturerProfilePage() {
  const session = await requireLecturerSession()

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-sm text-muted-foreground">Update your personal and office details.</p>
      </div>

      <ProfileForms firstName={session.firstName} email={session.email} staffId={session.matric} />
    </section>
  )
}
