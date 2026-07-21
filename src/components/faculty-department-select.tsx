"use client"

import { useState } from "react"
import { LAUTECH_FACULTIES } from "@/lib/data/lautech-faculties"

const selectClassName = "border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"

export function FacultyDepartmentSelect({
  defaultFaculty = "",
  defaultDepartment = "",
}: {
  defaultFaculty?: string
  defaultDepartment?: string
}) {
  const [faculty, setFaculty] = useState(defaultFaculty)

  const departments = LAUTECH_FACULTIES.find((f) => f.faculty === faculty)?.departments ?? []

  return (
    <>
      <select
        required
        name="faculty"
        className={selectClassName}
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
      >
        <option value="">Select Faculty</option>
        {LAUTECH_FACULTIES.map((f) => (
          <option key={f.faculty} value={f.faculty}>
            {f.faculty}
          </option>
        ))}
      </select>

      <select required name="department" className={selectClassName} defaultValue={defaultDepartment} disabled={!faculty}>
        <option value="">{faculty ? "Select Department" : "Select Faculty First"}</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </>
  )
}
