import { ROLES } from '@/data/config'

export function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 pt-3">
      {ROLES.map((role) => (
        <div key={role.key} className="flex items-center gap-1.5">
          <span className={`size-2.5 rounded-full ${role.colorClass}`} />
          <span className="text-xs text-muted-foreground">
            {role.label} (max {role.maxVacaciones})
          </span>
        </div>
      ))}
    </div>
  )
}
