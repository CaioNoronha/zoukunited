/**
 * Date Range Picker Field Component
 * Allows selecting a start and end date in a single calendar
 */

"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

interface DateRangePickerFieldProps {
  label?: string
  startDate: Date | undefined
  endDate: Date | undefined
  onRangeChange: (range: { start: Date | undefined; end: Date | undefined }) => void
  placeholder?: string
  required?: boolean
  error?: string
  invalid?: boolean
  className?: string
}

export function DateRangePickerField({
  startDate,
  endDate,
  onRangeChange,
  placeholder = "Selecione as datas",
  required = false,
  error,
  invalid = false,
  className = "",
}: DateRangePickerFieldProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  })

  React.useEffect(() => {
    setDate({
      from: startDate,
      to: endDate,
    })
  }, [startDate, endDate])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    onRangeChange({
      start: range?.from,
      end: range?.to,
    })
  }

  const formatDateRange = () => {
    if (date?.from) {
      if (date.to && date.from.getTime() !== date.to.getTime()) {
        return `${format(date.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(date.to, "dd/MM/yyyy", { locale: ptBR })}`
      }
      return format(date.from, "dd/MM/yyyy", { locale: ptBR })
    }
    return placeholder
  }

  // Get today's date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className={cn("flex flex-col gap-2 text-white", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal h-11 rounded-full border bg-black/15 px-4 text-sm shadow-none text-white hover:bg-[var(--ds-neutral-4)]/35 hover:text-white focus-visible:bg-[var(--ds-neutral-4)]/35 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none ${
              invalid
                ? "border-[var(--ds-secondary-pure)] focus-visible:border-[var(--ds-secondary-pure)] focus-visible:ring-[var(--ds-secondary-pure)]"
                : "border-[var(--ds-primary-1)]/20 focus-visible:border-[var(--ds-primary-1)]/60 focus-visible:ring-[var(--ds-primary-1)]/50"
            } ${!date?.from && "text-white/70"}`}
          >
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden rounded-2xl border border-[var(--ds-primary-1)]/40 bg-[var(--ds-neutral-6)] text-white shadow-lg"
          align="start"
          side="top"
          sideOffset={10}
          alignOffset={0}
          collisionPadding={12}
          avoidCollisions
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  )
}
