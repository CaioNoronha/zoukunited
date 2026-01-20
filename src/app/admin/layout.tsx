"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useRequireAuth } from "@/hooks/useAuth"
import { fetchUserProfile } from "@/services/user-profile"

const AdminSidebar = dynamic(
  () => import("@/components/common/admin-sidebar").then((m) => m.AdminSidebar),
  {
    ssr: false,
    loading: () => (
      <div
        className="hidden md:block fixed inset-y-0 left-0 w-[16rem] bg-[#171717] border-r border-[#2a2a2a]"
        aria-hidden
      />
    ),
  }
)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useRequireAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    let cancelled = false

    const checkAdmin = async () => {
      if (!user?.uid) {
        if (!cancelled) setIsAdmin(null)
        return
      }

      try {
        const profile = await fetchUserProfile(user.uid)
        if (cancelled) return
        const allowed = Boolean(profile?.isAdmin)
        setIsAdmin(allowed)
        if (!allowed) {
          router.replace("/home")
        }
      } catch (error) {
        console.error("Erro ao validar admin", error)
        if (!cancelled) {
          setIsAdmin(false)
          router.replace("/home")
        }
      }
    }

    checkAdmin()
    return () => {
      cancelled = true
    }
  }, [user?.uid, router])

  if (!user && !loading) {
    return null
  }

  if (isAdmin === false) {
    return null
  }

  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
    >
      <AdminSidebar />
      <SidebarInset className="bg-transparent relative">
        <div className="flex min-h-screen flex-col">
          <header className="flex h-12 shrink-0 items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1 !text-[#f29b0f] hover:!text-[#ffb357]" />
          </header>
          <main className="flex-1">{children}</main>
        </div>

        {(loading || isAdmin === null) && (
          <div className="pointer-events-none absolute inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Loader2 className="h-12 w-12 animate-spin text-[#f29b0f]" />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  )
}
