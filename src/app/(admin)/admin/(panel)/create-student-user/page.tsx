"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { type CreateStudentPayload } from "@/services/admin-student.service"
import { useCreateStudentMutation } from "@/hooks/queries/useCreateStudentMutation"

export default function AddStudentPage() {
  const [message, setMessage] = useState("")
  const createStudentMutation = useCreateStudentMutation()

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries()) as unknown as CreateStudentPayload

    try {
      const response = await createStudentMutation.mutateAsync({
        payload,
        queryParams: { source: 'admin-panel' },
      })

      if (!response.mailSent) {
        setMessage(
          `⚠️ Student created, but email failed (${response.emailError ?? 'unknown reason'}). Temporary password: ${response.temporaryPassword ?? 'N/A'}`,
        )
        e.currentTarget.reset()
        return
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to create student user.'
      setMessage(`❌ ${message}`)
      return
    }

    setMessage('✅ Student created and login details sent to email.')
    e.currentTarget.reset()
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Student User</h1>
        <p className="text-sm text-muted-foreground">Frontend form template for admin onboarding.</p>
      </div>

      {message && <p className="rounded-md border bg-muted/30 px-4 py-3 text-sm font-medium">{message}</p>}

      <form onSubmit={submitForm} className="grid grid-cols-1 gap-4 rounded-xl border p-5 md:grid-cols-2">
        <h2 className="col-span-2 text-lg font-semibold">Personal Information</h2>

        <Input required name="surname" placeholder="Surname" />
        <Input required name="first_name" placeholder="First Name" />
        <Input name="middle_name" placeholder="Middle Name" />

        <select required name="gender" className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <Input required type="date" name="date_of_birth" />
        <Input required name="country" placeholder="Country" />
        <Input required name="nationality_type" placeholder="Nationality Type" />
        <Input required name="state_of_origin" placeholder="State of Origin" />
        <Input required name="lga" placeholder="Local Govt. Area" />
        <Input name="ward" placeholder="Ward" />

        <select required name="marital_status" className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm">
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        <select required name="military_personnel" className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm">
          <option value="">Military Personnel?</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <h2 className="col-span-2 mt-2 text-lg font-semibold">Contact Information</h2>

        <Input required name="phone" placeholder="Phone Number" />
        <Input required type="email" name="email" placeholder="Email Address" />
        <Textarea required className="col-span-2" name="permanent_address" placeholder="Permanent Address" />

        <h2 className="col-span-2 mt-2 text-lg font-semibold">Academic Information</h2>

        <Input required name="matric" placeholder="Matric Number" />
        <Input required name="programme" placeholder="Programme" />
        <Input required name="department" placeholder="Department" />
        <Input required name="faculty" placeholder="Faculty" />

        <select required name="level" className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm">
          <option value="">Select Level</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
        </select>

        <h2 className="col-span-2 mt-2 text-lg font-semibold">Next of Kin</h2>

        <Input required name="nok_full_name" placeholder="Full Name" />
        <Input required name="nok_relationship" placeholder="Relationship" />
        <Input required name="nok_phone" placeholder="Phone Number" />
        <Input required type="email" name="nok_email" placeholder="Email" />
        <Textarea required className="col-span-2" name="nok_address" placeholder="Address" />

        <Button disabled={createStudentMutation.isPending} type="submit" className="col-span-2 mt-2">
          {createStudentMutation.isPending ? "Saving template..." : "Create Student User"}
        </Button>
      </form>
    </div>
  )
}