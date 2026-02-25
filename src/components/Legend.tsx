import { ROLES } from '@/data/config'
import { cn } from '@/lib/utils'

export function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-3 pt-4">
      {ROLES.map((role) => (
        <div
          key={role.key}
          className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 shadow-sm"
        >
          <span className={cn('size-2.5 rounded-full', role.colorClass)} />
          <span className="text-[11px] font-medium text-foreground">
            {role.label}
          </span>
          {role.maxVacaciones !== undefined && (
            <span className="text-[10px] text-muted-foreground">
              max {role.maxVacaciones}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
