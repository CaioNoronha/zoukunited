"use client"

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  UserRound,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function NavUser({
  user,
  onLogout,
}: {
  user: {
    name?: string | null
    email?: string | null
    avatar?: string | null
  }
  onLogout?: () => Promise<void> | void
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()

  const displayName =
    user.name?.trim() ||
    (user.email ? user.email.split("@")[0] : "") ||
    "Usuário"
  const email = user.email || "Conta sem e-mail"
  const avatar = user.avatar || undefined

  const handleAccount = () => {
    router.push("/professional/producer/profile")
  }

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout()
      return
    }

    router.push("/login")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="text-white !text-white bg-transparent hover:!bg-[var(--ds-primary-1)]/12 focus:!bg-[var(--ds-primary-1)]/12 data-[state=open]:!bg-[var(--ds-primary-1)]/12 data-[state=open]:!text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-0 bg-[var(--ds-neutral-6)] text-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[var(--ds-neutral-3)] h-px mx-3" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={handleAccount}
                className="text-white hover:text-white focus:text-white hover:bg-[var(--ds-primary-1)]/15 focus:bg-[var(--ds-primary-1)]/20 [&_svg]:text-[var(--ds-primary-1)]"
              >
                <UserRound className="text-[var(--ds-primary-1)]" />
                Conta
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-white focus:text-white hover:bg-[var(--ds-primary-1)]/15 focus:bg-[var(--ds-primary-1)]/20 [&_svg]:text-[var(--ds-primary-1)]">
                <CreditCard className="text-[var(--ds-primary-1)]" />
                Pagamento
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-white focus:text-white hover:bg-[var(--ds-primary-1)]/15 focus:bg-[var(--ds-primary-1)]/20 [&_svg]:text-[var(--ds-primary-1)]">
                <Bell className="text-[var(--ds-primary-1)]" />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[var(--ds-neutral-3)] h-px mx-3" />
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                void handleLogout()
              }}
              className="text-white hover:text-white focus:text-white hover:bg-[var(--ds-primary-1)]/15 focus:bg-[var(--ds-primary-1)]/20 [&_svg]:text-[var(--ds-primary-1)]"
            >
              <LogOut className="text-[var(--ds-primary-1)]" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
