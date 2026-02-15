import type { DayVacationInfo } from '@/types'
import { getDaysInMonth, getFirstDayOfMonth, toDateKey } from '@/utils/dates'
import { DayCell } from './DayCell'

const DAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

interface CalendarProps {
  readonly year: number
  readonly month: number
  readonly getVacationsForDay: (dateKey: string) => DayVacationInfo | null
  readonly onDaySelect: (dateKey: string) => void
}

export function Calendar({ year, month, getVacationsForDay, onDaySelect }: CalendarProps) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const today = new Date()
  const todayKey =
    today.getFullYear() === year && today.getMonth() === month
      ? toDateKey(year, month, today.getDate())
      : null

  return (
    <div className="grid grid-cols-7 gap-px px-1 pt-2">
      {DAY_HEADERS.map((d) => (
        <div key={d} className="pb-1 text-center text-xs font-medium text-muted-foreground">
          {d}
        </div>
      ))}

      {Array.from({ length: firstDay }, (_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const dateKey = toDateKey(year, month, day)
        return (
          <DayCell
            key={day}
            day={day}
            dateKey={dateKey}
            isToday={dateKey === todayKey}
            vacationInfo={getVacationsForDay(dateKey)}
            onSelect={onDaySelect}
          />
        )
      })}
    </div>
  )
}
