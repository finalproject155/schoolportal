"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
 LayoutDashboard,
    BookOpenCheck,
    ReceiptText,
    Calendar,

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import Image from "next/image"
import logo from "@/assets/pngaaa.com-995389.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
 
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },


      {
      title: "Course",
      url: "#",
      icon: BookOpen,
    },



      {
      title: "Grades",
      url: "#",
      icon: BookOpenCheck,
    },




      {
      title: "Fees",
      url: "#",
      icon: ReceiptText,
    },



      {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },



      {
      title: "Swies",
      url: "#",
      icon: SquareTerminal,
    },
  
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}

       <div className="flex flex-row items-center justify-center">
         <Image src={ logo} alt="Logo" width={100} height={100} />
       </div>

      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
