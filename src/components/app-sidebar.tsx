"use client"

import * as React from "react"
import {
  BookOpen,
 LayoutDashboard,
    BookOpenCheck,
    ReceiptText,
    Calendar,
    UserRound,
    GraduationCap,
    FileStack,
    ShieldCheck,
    IdCard,
    Library,
    BedDouble,
    Trophy,
    Briefcase,
    ShieldAlert,
    Handshake,

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
      url: "/dashboard",
      icon: LayoutDashboard,
    },


      {
      title: "Course",
      url: "/course",
      icon: BookOpen,
    },


      {
      title: "My Program",
      url: "/program",
      icon: GraduationCap,
    },


      {
      title: "Results & GPA",
      url: "/results",
      icon: BookOpenCheck,
    },




      {
      title: "Fees",
      url: "/fees",
      icon: ReceiptText,
    },



      {
      title: "Timetable",
      url: "/timetable",
      icon: Calendar,
    },



      {
      title: "Transcript",
      url: "/transcript",
      icon: FileStack,
    },


      {
      title: "Clearance",
      url: "/clearance",
      icon: ShieldCheck,
    },


      {
      title: "ID Card",
      url: "/id-card",
      icon: IdCard,
    },


      {
      title: "E-Library",
      url: "/library",
      icon: Library,
    },


      {
      title: "Hostel",
      url: "/hostel",
      icon: BedDouble,
    },


      {
      title: "Sports",
      url: "/sports",
      icon: Trophy,
    },


      {
      title: "IT Registration",
      url: "/it-registration",
      icon: Briefcase,
    },


      {
      title: "Placement Finder",
      url: "/placement",
      icon: Handshake,
    },


      {
      title: "Security / SOS",
      url: "/sos",
      icon: ShieldAlert,
    },


      {
      title: "Profile",
      url: "/profile",
      icon: UserRound,
    },

  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3">
        {/* <TeamSwitcher teams={data.teams} /> */}

       <div className="flex flex-row items-center justify-center">
         <Image src={ logo} alt="Logo" width={56} height={56} />
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
