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
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}

      <SidebarMenu className="py-3 gap-1">
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="px-3 py-2.5">
                <Link
                  className={`${isActiveClassLink(item.url)} hover:bg-accent hover:text-white`}
                  href={item.url}
                >
                  {item.icon && (
                    <item.icon size={17} className={isActiveClassIcon(item.url)} />
                  )}
                  <span className="text-sm font-lex">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
