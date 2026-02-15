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
        'flex flex-col items-center gap-0.5 rounded-md p-1 text-sm transition-colors',
        'hover:bg-muted active:bg-muted/80',
        isToday && 'ring-2 ring-foreground ring-offset-1',
        hasExceeded && 'bg-danger/10',
      )}
    >
      <span className={cn('text-xs font-medium', hasExceeded && 'text-danger')}>
        {day}
      </span>

      {totalVacations > 0 && (
        <div className="flex flex-wrap justify-center gap-0.5">
          {ROLES.map((role) =>
            vacationInfo!.byRole[role.key].map((_, idx) => (
              <span
                key={`${role.key}-${idx}`}
                className={cn('size-1.5 rounded-full', role.colorClass)}
              />
            )),
          )}
        </div>
      )}
    </button>
  )
}
