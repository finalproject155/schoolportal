"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LogoutButton({ redirectTo }: { redirectTo: string }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}
