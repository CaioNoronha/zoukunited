"use client"

import * as React from "react"
import { CalendarCheck2, GraduationCap, LayoutPanelLeft, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"

import { NavMain } from "@/components/common/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { signOut } from "@/services/auth"
import { db } from "@/lib/firebase"

function buildSubItems(items: { id: string; title: string }[], baseUrl: string) {
  if (items.length === 0) {
    return [{ title: "Sem registros", url: baseUrl }]
  }
  return items.map((item) => ({
    title: item.title,
    url: `${baseUrl}?id=${item.id}`,
  }))
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const [events, setEvents] = React.useState<{ id: string; title: string }[]>([])
  const [courses, setCourses] = React.useState<{ id: string; title: string }[]>([])

  React.useEffect(() => {
    let cancelled = false
    const fetchItems = async () => {
      try {
        const [eventsSnap, coursesSnap] = await Promise.all([
          getDocs(collection(db, "events")),
          getDocs(collection(db, "courses")),
        ])

        const nextEvents = eventsSnap.docs.map((docSnap) => {
          const data = docSnap.data() as { title?: string; name?: string }
          return {
            id: docSnap.id,
            title: String(data.title || data.name || docSnap.id),
          }
        })

        const nextCourses = coursesSnap.docs.map((docSnap) => {
          const data = docSnap.data() as { title?: string; name?: string }
          return {
            id: docSnap.id,
            title: String(data.title || data.name || docSnap.id),
          }
        })

        if (!cancelled) {
          setEvents(nextEvents)
          setCourses(nextCourses)
        }
      } catch (error) {
        console.error("Erro ao carregar itens do admin", error)
        if (!cancelled) {
          setEvents([])
          setCourses([])
        }
      }
    }
    fetchItems()
    return () => {
      cancelled = true
    }
  }, [])

  const navMain = React.useMemo(() => {
    const eventItems = buildSubItems(events, "/admin/events").map((item) => ({
      ...item,
      icon: CalendarCheck2,
    }))
    const courseItems = buildSubItems(courses, "/admin/courses").map((item) => ({
      ...item,
      icon: GraduationCap,
    }))

    return [
      {
        title: "Eventos",
        url: "/admin/events",
        icon: LayoutPanelLeft,
        items: eventItems,
      },
      {
        title: "Cursos",
        url: "/admin/courses",
        icon: GraduationCap,
        items: courseItems,
      },
    ]
  }, [events, courses])

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[var(--ds-neutral-6)]/80 backdrop-blur text-white border-r border-[var(--ds-primary-1)] [&_[data-slot=sidebar]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar-wrapper]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar-inner]]:bg-[var(--ds-neutral-6)]/80 [&_[data-sidebar=sidebar]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar]]:backdrop-blur [&_[data-slot=sidebar-wrapper]]:backdrop-blur [&_[data-slot=sidebar-inner]]:backdrop-blur [&_[data-mobile=true][data-sidebar=sidebar]]:bg-[var(--ds-neutral-6)]/85 [&_[data-mobile=true][data-sidebar=sidebar]]:text-white [&_[data-mobile=true][data-slot=sidebar-inner]]:bg-[var(--ds-neutral-6)]/85 [&_[data-mobile=true][data-slot=sidebar-inner]]:backdrop-blur [&_button[data-slot=sidebar-trigger]]:!bg-transparent [&_button[data-slot=sidebar-trigger]:hover]:!bg-[var(--ds-primary-1)]/15 [&_button[data-slot=sidebar-trigger]:active]:!bg-[var(--ds-primary-1)]/20 [&_button[data-slot=sidebar-trigger]:focus-visible]:!ring-0 [&_button[data-slot=sidebar-trigger]:focus-visible]:!ring-offset-0 [&_button[data-slot=sidebar-trigger]]:!shadow-none [&_button[data-slot=sidebar-trigger]]:!border [&_button[data-slot=sidebar-trigger]]:!border-transparent [&_button[data-slot=sidebar-trigger]_svg]:!text-[var(--ds-primary-1)] [&_button[data-slot=sidebar-trigger]]:!text-[var(--ds-primary-1)]"
      style={
        {
          "--sidebar-border": "var(--ds-primary-1)",
          "--sidebar-ring": "var(--ds-primary-1)",
          "--ds-primary-pure": "#f29b0f",
          "--ds-primary-1": "#f29b0f",
          "--ds-primary-2": "#ffb357",
        } as React.CSSProperties
      }
      {...props}
    >
      <SidebarHeader>
        <Link
          href="/admin"
          className="group-data-[collapsible=icon]/sidebar:hidden flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          <Image src="/icons/logo.png" alt="Zouk United" width={148} height={24} priority />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label="Admin" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-white !text-white bg-transparent hover:!bg-[var(--ds-primary-1)]/12 focus:!bg-[var(--ds-primary-1)]/12"
            >
              <LogOut className="text-[var(--ds-primary-1)]" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
