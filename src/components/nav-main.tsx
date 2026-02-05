"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  const isActiveClassLink = (path: any) => {
    return pathname === path ? "bg-accent text-white" : "";
  };

  const isActiveClassIcon = (path: any) => {
    return pathname === path ? "text-white" : "text-primary";
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className={`px-5 py-7`}>
                <Link
                  className={`${isActiveClassLink(item.url)} hover:bg-(--primary-hover) hover:text-white`}
                  href={item.url}
                >
                  {item.icon && (
                    <item.icon className={` ${isActiveClassIcon(item.url)} `} />
                  )}
                  <span className=" font-light text-[16px] font-lex">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
