"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerFieldProps = {
  value?: Date
  onChange: (value: Date | undefined) => void
  placeholder?: string
  invalid?: boolean
  error?: string
  hideIcon?: boolean
  buttonClassName?: string
  fullWidth?: boolean
  popoverAlignOffset?: number
  popoverSideOffset?: number
  popoverAlign?: "start" | "center" | "end"
  popoverSide?: "top" | "right" | "bottom" | "left"
}

export function DatePickerField({
  value,
  onChange,
  placeholder = "Selecione a data",
  invalid = false,
  error,
  hideIcon = false,
  buttonClassName,
  fullWidth = true,
  popoverAlignOffset,
  popoverSideOffset,
  popoverSide,
  popoverAlign = "center",
}: DatePickerFieldProps) {
  const today = React.useMemo(() => {
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return t
  }, [])

  const display = value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : placeholder

  return (
    <div className="flex flex-col gap-2 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal h-11 rounded-full border border-[var(--ds-primary-1)]/30 bg-[var(--ds-neutral-4)]/25 px-4 text-sm text-white shadow-none hover:bg-[var(--ds-neutral-4)]/40 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:text-white",
              fullWidth ? "w-full" : "w-auto flex-1 min-w-0",
              invalid
                ? "border-[var(--ds-secondary-pure)] focus-visible:border-[var(--ds-secondary-pure)] focus-visible:ring-[var(--ds-secondary-pure)]"
                : "focus-visible:border-[var(--ds-primary-1)]/60 focus-visible:ring-[var(--ds-primary-1)]/50",
              !value && "text-white/70",
              buttonClassName
            )}
          >
            {!hideIcon && <CalendarIcon className="mr-2 h-4 w-4 text-[var(--ds-primary-1)]" />}
            {display}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden rounded-2xl border border-[var(--ds-primary-1)]/40 bg-[var(--ds-neutral-6)] text-white shadow-lg [&_.rdp]:bg-[var(--ds-neutral-6)] [&_.rdp-table]:bg-transparent [&_.rdp-month]:bg-transparent [&_.rdp-caption_label]:text-white [&_.rdp-head_cell]:text-white/70 [&_button.rdp-day]:text-white [&_button.rdp-day]:rounded-md [&_button.rdp-day]:bg-transparent [&_button.rdp-day:hover]:bg-[var(--ds-neutral-4)]/40 [&_button.rdp-day:focus-visible]:ring-2 [&_button.rdp-day:focus-visible]:ring-[var(--ds-primary-1)]/60 [&_button.rdp-day[data-selected=true]]:bg-[var(--ds-primary-1)] [&_button.rdp-day[data-selected=true]]:text-white [&_button.rdp-day[data-selected=true]:hover]:bg-[var(--ds-primary-1)] [&_.rdp-day_disabled]:text-white/30"
          align={popoverAlign}
          side={popoverSide ?? "top"}
          sideOffset={popoverSideOffset ?? 10}
          alignOffset={popoverAlignOffset ?? 0}
          collisionPadding={12}
          avoidCollisions
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => onChange(date ?? undefined)}
            numberOfMonths={1}
            initialFocus
            className="rounded-xl bg-transparent text-white p-3"
            modifiersClassNames={{
              selected:
                "bg-[var(--ds-primary-2)] text-white rounded-md data-[selected=true]:bg-[var(--ds-primary-2)] data-[selected=true]:text-white",
            }}
            classNames={{
              root: "bg-[var(--ds-neutral-6)] text-white rounded-xl p-3",
              month: "space-y-2 bg-transparent",
              table: "bg-transparent",
              head_cell: "text-white/70 text-xs",
              nav_button: "text-white hover:bg-[var(--ds-neutral-4)]/40 rounded-full",
              day_button:
                "text-white rounded-md bg-transparent hover:bg-[var(--ds-neutral-4)]/40 focus-visible:ring-2 focus-visible:ring-[var(--ds-primary-1)]/60 data-[selected=true]:bg-[var(--ds-primary-2)] data-[selected=true]:text-white data-[selected=true]:hover:bg-[var(--ds-primary-2)] data-[outside=true]:text-white/40",
            }}
            styles={{
              root: { background: "var(--ds-neutral-6)", color: "white" },
              month: { background: "var(--ds-neutral-6)" },
              caption: { background: "var(--ds-neutral-6)" },
              table: { background: "var(--ds-neutral-6)" },
              head: { background: "var(--ds-neutral-6)" },
              row: { background: "var(--ds-neutral-6)" },
              cell: { background: "var(--ds-neutral-6)" },
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  )
}
