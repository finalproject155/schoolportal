import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PublishAnnouncementPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Publish Announcement</h2>
        <p className="text-sm text-muted-foreground">Draft and publish updates to students and staff.</p>
      </div>

      <div className="grid gap-4 rounded-xl border p-4 md:p-5">
        <Input placeholder="Announcement Title" />
        <Textarea placeholder="Write your announcement details..." />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>
    </section>
  )
}