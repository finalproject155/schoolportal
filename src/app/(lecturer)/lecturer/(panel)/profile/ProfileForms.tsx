"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfileForms({
  firstName,
  email,
  staffId,
}: {
  firstName: string
  email: string
  staffId: string
}) {
  const [officeHours, setOfficeHours] = useState("")
  const [profileMessage, setProfileMessage] = useState("")
  const [savingProfile, setSavingProfile] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)

  async function saveProfile() {
    setSavingProfile(true)
    setProfileMessage("")
    try {
      const res = await fetch("/api/lecturer/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ officeHours }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfileMessage("✅ Profile updated.")
    } catch (error) {
      setProfileMessage(`❌ ${error instanceof Error ? error.message : "Failed to update."}`)
    } finally {
      setSavingProfile(false)
    }
  }

  async function updatePassword() {
    setPasswordMessage("")
    if (newPassword !== confirmPassword) {
      setPasswordMessage("❌ New passwords do not match.")
      return
    }
    setSavingPassword(true)
    try {
      const res = await fetch("/api/lecturer/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setPasswordMessage("✅ Password updated.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setPasswordMessage(`❌ ${error instanceof Error ? error.message : "Failed to update."}`)
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <>
      <div className="grid gap-4 rounded-xl border p-4 md:max-w-lg md:p-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input defaultValue={firstName} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Staff Email</label>
          <Input defaultValue={email} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Staff ID</label>
          <Input defaultValue={staffId} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Office Hours</label>
          <Input
            placeholder="Mon & Wed, 2:00PM - 4:00PM"
            value={officeHours}
            onChange={(e) => setOfficeHours(e.target.value)}
          />
        </div>
        {profileMessage && <p className="text-sm font-medium">{profileMessage}</p>}
        <div className="flex justify-end">
          <Button onClick={saveProfile} disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border p-4 md:max-w-lg md:p-5">
        <h3 className="font-semibold">Change Password</h3>
        <Input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordMessage && <p className="text-sm font-medium">{passwordMessage}</p>}
        <div className="flex justify-end">
          <Button variant="outline" onClick={updatePassword} disabled={savingPassword}>
            {savingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </>
  )
}
