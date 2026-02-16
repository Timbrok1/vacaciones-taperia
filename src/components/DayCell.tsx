import type { DayVacationInfo } from '@/types'
import { ROLES } from '@/data/config'
import { cn } from '@/lib/utils'

interface DayCellProps {
  readonly day: number
  readonly dateKey: string
  readonly isToday: boolean
  readonly vacationInfo: DayVacationInfo | null
  readonly onSelect: (dateKey: string) => void
}

export function DayCell({ day, dateKey, isToday, vacationInfo, onSelect }: DayCellProps) {
  const hasExceeded = vacationInfo
    ? ROLES.some((role) => vacationInfo.byRole[role.key].length > role.maxVacaciones)
    : false

  const totalVacations = vacationInfo
    ? ROLES.reduce((sum, role) => sum + vacationInfo.byRole[role.key].length, 0)
    : 0

  return (
    <button
      onClick={() => onSelect(dateKey)}
      className={cn(
        'relative flex aspect-square flex-col items-center justify-start gap-0.5 rounded-xl p-1 pt-1.5 transition-all duration-150',
        'active:scale-95',
        isToday && 'bg-primary text-primary-foreground shadow-sm',
        !isToday && hasExceeded && 'bg-danger-light',
        !isToday && !hasExceeded && 'hover:bg-muted',
      )}
    >
      <span
        className={cn(
          'text-[13px] font-semibold leading-none',
          isToday && 'text-primary-foreground',
          !isToday && hasExceeded && 'text-danger',
          !isToday && !hasExceeded && 'text-foreground',
        )}
      >
        {day}
      </span>

      {totalVacations > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-[3px] pt-0.5">
          {ROLES.map((role) => {
            const count = vacationInfo!.byRole[role.key].length
            if (count === 0) return null
            const exceeded = count > role.maxVacaciones
            return (
              <span
                key={role.key}
                className={cn(
                  'flex size-[18px] items-center justify-center rounded-full text-[9px] font-bold text-white',
                  role.colorClass,
                  exceeded && 'ring-1.5 ring-danger',
                )}
              >
                {count}
              </span>
            )
          })}
        </div>
      )}
    </button>
  )
}
