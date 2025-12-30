"use client"

import * as React from "react"
import {
  CalendarCheck2,
  CalendarDays,
  GraduationCap,
  Headphones,
  LayoutPanelLeft,
  School,
  UserRound,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"

import { useTranslation } from "@/hooks/useTranslation"
import { NavMain } from "@/components/common/nav-main"
import { NavUser } from "@/components/common/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from "@/services/auth"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()
  const sidebar = t.professional.sidebar
  const { user } = useAuth()
  const router = useRouter()
  const [roles, setRoles] = React.useState<string[]>([])

  const userData = {
    name: user?.displayName || "WeDance",
    email: user?.email || "oi@wedance.com",
    avatar: user?.photoURL || "/avatars/shadcn.jpg",
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  React.useEffect(() => {
    const fetchRoles = async () => {
      if (!user?.uid) {
        setRoles([])
        return
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "professional"))
        const collected = snap.docs.map((d) => d.id)
        setRoles(collected)
      } catch (error) {
        console.error("Erro ao carregar perfis profissionais", error)
        setRoles([])
      }
    }
    fetchRoles()
  }, [user?.uid])

  const navMain = React.useMemo(() => {
    const items = []
    if (roles.includes("producer")) {
      items.push({
        title: sidebar.producer.title,
        url: "/professional/producer/events",
        icon: LayoutPanelLeft,
        items: [
          { title: sidebar.producer.events, url: "/professional/producer/events", icon: CalendarCheck2 },
          { title: sidebar.producer.calendar, url: "/professional/producer/calendar", icon: CalendarDays },
          { title: sidebar.producer.profile, url: "/professional/producer/profile", icon: UserRound },
        ],
      })
    }
    if (roles.includes("teacher")) {
      items.push({
        title: sidebar.teacher.title,
        url: "/professional/teacher/works",
        icon: GraduationCap,
        items: [
          { title: sidebar.teacher.works, url: "/professional/teacher/works", icon: CalendarCheck2 },
          { title: sidebar.teacher.profile, url: "/professional/teacher/profile", icon: UserRound },
        ],
      })
    }
    if (roles.includes("dj")) {
      items.push({
        title: sidebar.dj.title,
        url: "/professional/dj/works",
        icon: Headphones,
        items: [
          { title: sidebar.dj.works, url: "/professional/dj/works", icon: CalendarCheck2 },
          { title: sidebar.dj.profile, url: "/professional/dj/profile", icon: UserRound },
        ],
      })
    }
    if (roles.includes("school")) {
      items.push({
        title: sidebar.school.title,
        url: "/professional/school/classes",
        icon: School,
        items: [
          { title: sidebar.school.classes, url: "/professional/school/classes", icon: Users },
          { title: sidebar.school.teachers, url: "/professional/school/teachers", icon: Users },
          { title: sidebar.school.profile, url: "/professional/school/profile", icon: UserRound },
        ],
      })
    }

    if (items.length === 0) {
      items.push({
        title: "Dashboard",
        url: "/professional/dashboard.tsx",
        icon: LayoutPanelLeft,
        items: [],
      })
    }
    return items
  }, [
    roles,
    sidebar.dj.profile,
    sidebar.dj.title,
    sidebar.dj.works,
    sidebar.producer.calendar,
    sidebar.producer.events,
    sidebar.producer.profile,
    sidebar.producer.title,
    sidebar.school.classes,
    sidebar.school.profile,
    sidebar.school.teachers,
    sidebar.school.title,
    sidebar.teacher.profile,
    sidebar.teacher.title,
    sidebar.teacher.works,
  ])

  return (
    <Sidebar
      collapsible="icon"
      className="bg-[var(--ds-neutral-6)]/80 backdrop-blur text-white border-r border-[var(--ds-primary-1)] [&_[data-slot=sidebar]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar-wrapper]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar-inner]]:bg-[var(--ds-neutral-6)]/80 [&_[data-sidebar=sidebar]]:bg-[var(--ds-neutral-6)]/80 [&_[data-slot=sidebar]]:backdrop-blur [&_[data-slot=sidebar-wrapper]]:backdrop-blur [&_[data-slot=sidebar-inner]]:backdrop-blur [&_[data-mobile=true][data-sidebar=sidebar]]:bg-[var(--ds-neutral-6)]/85 [&_[data-mobile=true][data-sidebar=sidebar]]:text-white [&_[data-mobile=true][data-slot=sidebar-inner]]:bg-[var(--ds-neutral-6)]/85 [&_[data-mobile=true][data-slot=sidebar-inner]]:backdrop-blur [&_button[data-slot=sidebar-trigger]]:!bg-transparent [&_button[data-slot=sidebar-trigger]:hover]:!bg-[var(--ds-primary-1)]/15 [&_button[data-slot=sidebar-trigger]:active]:!bg-[var(--ds-primary-1)]/20 [&_button[data-slot=sidebar-trigger]:focus-visible]:!ring-0 [&_button[data-slot=sidebar-trigger]:focus-visible]:!ring-offset-0 [&_button[data-slot=sidebar-trigger]]:!shadow-none [&_button[data-slot=sidebar-trigger]]:!border [&_button[data-slot=sidebar-trigger]]:!border-transparent [&_button[data-slot=sidebar-trigger]_svg]:!text-[var(--ds-primary-1)] [&_button[data-slot=sidebar-trigger]]:!text-[var(--ds-primary-1)]"
      {...props}
    >
      <SidebarHeader>
        <Link
          href="/home"
          className="group-data-[collapsible=icon]/sidebar:hidden flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          <Image
            src="/icons/wedance_horizontal_2.png"
            alt="WeDance"
            width={148}
            height={24}
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label={sidebar.profiles} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
