"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLecturerLoginMutation } from "@/hooks/queries/useLecturerLoginMutation"

export default function LecturerLoginPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const loginMutation = useLecturerLoginMutation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const staff_id = String(formData.get("staff_id") || "")
    const password = String(formData.get("password") || "")

    try {
      await loginMutation.mutateAsync({
        payload: { staff_id, password },
        queryParams: { source: "lecturer-web" },
      })
      router.push("/lecturer")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed"
      setMessage(`❌ ${message}`)
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Lecturer Login</h1>
            <p className="text-sm text-muted-foreground">Sign in to manage your courses and students</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Staff ID</label>
            <Input type="text" name="staff_id" required placeholder="e.g. STF1023" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" name="password" required placeholder="Enter password" />
          </div>

          {message && <p className="text-sm font-medium text-accent">{message}</p>}

          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
