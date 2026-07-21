"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FacultyDepartmentSelect } from "@/components/faculty-department-select"
import { type CreateLecturerPayload } from "@/services/admin-lecturer.service"
import { useCreateLecturerMutation } from "@/hooks/queries/useCreateLecturerMutation"

export default function CreateLecturerUserPage() {
  const [message, setMessage] = useState("")
  const createLecturerMutation = useCreateLecturerMutation()

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries()) as unknown as CreateLecturerPayload

    try {
      const response = await createLecturerMutation.mutateAsync({
        payload,
        queryParams: { source: 'admin-panel' },
      })

      if (!response.mailSent) {
        setMessage(
          `⚠️ Lecturer created, but email failed (${response.emailError ?? 'unknown reason'}). Temporary password: ${response.temporaryPassword ?? 'N/A'}`,
        )
        e.currentTarget.reset()
        return
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to create lecturer user.'
      setMessage(`❌ ${message}`)
      return
    }

    setMessage('✅ Lecturer created and login details sent to email.')
    e.currentTarget.reset()
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create Lecturer User</h1>
        <p className="text-sm text-muted-foreground">Onboard a new lecturer and email them their login details.</p>
      </div>

      {message && <p className="rounded-md border bg-muted/30 px-4 py-3 text-sm font-medium">{message}</p>}

      <form onSubmit={submitForm} className="grid grid-cols-1 gap-4 rounded-xl border p-5 md:grid-cols-2">
        <Input required name="surname" placeholder="Surname" />
        <Input required name="first_name" placeholder="First Name" />
        <Input required name="staff_id" placeholder="Staff ID (e.g. STF1023)" />
        <Input required type="email" name="email" placeholder="Email Address" />
        <Input required name="phone" placeholder="Phone Number" />
        <FacultyDepartmentSelect />
        <Input name="office_hours" placeholder="Office Hours (optional)" />

        <Button disabled={createLecturerMutation.isPending} type="submit" className="col-span-2 mt-2">
          {createLecturerMutation.isPending ? "Creating..." : "Create Lecturer User"}
        </Button>
      </form>
    </section>
  )
}
