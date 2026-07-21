"use client"

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserPlus,
  BookOpen,
  Megaphone,
  BarChart3,
  ReceiptText,
  FileText,
  ShieldCheck,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const navMain = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Manage User Account", url: "/admin/manage-user-account", icon: Users },
  { title: "Create Student User", url: "/admin/create-student-user", icon: GraduationCap },
  { title: "Create Lecturer User", url: "/admin/create-lecturer-user", icon: UserPlus },
  { title: "Manage Course Offering", url: "/admin/manage-course-offering", icon: BookOpen },
  { title: "Publish Announcement", url: "/admin/publish-announcement", icon: Megaphone },
  { title: "View Registration Stat", url: "/admin/view-registration-stat", icon: BarChart3 },
  { title: "Manage Fee Records", url: "/admin/manage-fee-records", icon: ReceiptText },
  { title: "Generate Reports", url: "/admin/generate-reports", icon: FileText },
]

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3">
        <div className="flex items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold leading-none">Admin Console</p>
            <p className="text-xs text-muted-foreground">School Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
