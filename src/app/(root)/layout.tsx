import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/Ellipse 1.svg"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { BellDot } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[100px] shrink-0  shadow-sm items-center gap-2 transition-[width,height]  ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="">
              <BreadcrumbList className="flex flex-row justify-between w-full">
                <BreadcrumbItem className="hidden md:block">
                  
                  <div>
                    <h1 className="text-[14px] text-secondary font-inter font-medium  ">Good Morning! Goodness</h1>
                    <p className="text-black font-lex font-semibold text-[15px] ">Program</p>
                  </div>
                </BreadcrumbItem>
               
              </BreadcrumbList>
            </Breadcrumb>
          </div>


           <div className="flex items-center gap-2 px-4">
           <div>
                <BellDot />
           </div>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-10"
            />
            <Breadcrumb className="">
              <BreadcrumbList className="flex flex-row justify-between w-full">
                <BreadcrumbItem className="hidden md:block">
                  <div className="flex flex-row items-center gap-5">
                    <div className="border-[1px] h-[70px] w-[70px] group-has-data-[collapsible=icon]/sidebar-wrapper:w-12  group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#FFD599] items-center justify-center flex rounded-[35px] ">
                         <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={logo.src} alt="Logo" width={60} height={60} />
                  <AvatarFallback className=" rounded-lg">CN</AvatarFallback>
                </Avatar>
                    </div>

                    <div>
                        <h1 className="text-sm font-lex font-semibold text-black">softwareengineerjoycy@gmail.com</h1>
                        <p className="text-sm font-light font-inter text-secondary">2021001710</p>
                    </div>
                  </div>
                </BreadcrumbItem>
               

              </BreadcrumbList>
            </Breadcrumb>
          </div>
          </div>
        </header>

        {/* 👇 This is where pages render */}
        <div className="flex bg-[#B2B37721] flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
