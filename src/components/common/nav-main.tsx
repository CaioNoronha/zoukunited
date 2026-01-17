"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  label = "Menu",
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
  label?: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white/60">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="text-lg text-white !text-white bg-transparent hover:!text-white focus:!text-white data-[active=true]:!text-white data-[active=true]:!bg-transparent data-[state=open]:!bg-transparent data-[active=true]:!shadow-none data-[state=open]:!shadow-none !shadow-none [&_svg]:!size-5 [&_svg]:text-[var(--ds-primary-1)] [&_svg]:stroke-[var(--ds-primary-1)] hover:!bg-[var(--ds-primary-1)]/14 focus:!bg-[var(--ds-primary-1)]/14 data-[state=open]:hover:!bg-[var(--ds-primary-1)]/14 data-[active=true]:hover:!bg-[var(--ds-primary-1)]/14"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto text-[var(--ds-primary-1)] transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="text-lg text-white !text-white bg-transparent hover:!text-white focus:!text-white data-[active=true]:!text-white data-[active=true]:!bg-[var(--ds-primary-1)]/12 [&_svg]:!size-5 [&_svg]:text-[var(--ds-primary-1)] [&_svg]:stroke-[var(--ds-primary-1)] hover:!bg-[var(--ds-primary-1)]/14 focus:!bg-[var(--ds-primary-1)]/14 data-[active=true]:hover:!bg-[var(--ds-primary-1)]/14"
                      >
                        <Link href={subItem.url} prefetch={false}>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
