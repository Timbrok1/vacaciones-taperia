import { useEffect, useRef } from 'react'
import type { DayVacationInfo } from '@/types'
import { ROLES } from '@/data/config'
import { formatDateSpanish } from '@/utils/dates'
import { cn } from '@/lib/utils'

interface DayModalProps {
  readonly dateKey: string | null
  readonly vacationInfo: DayVacationInfo | null
  readonly onClose: () => void
}

export function DayModal({ dateKey, vacationInfo, onClose }: DayModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dateKey) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [dateKey])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose()
    }
  }

  if (!dateKey) return null

  const totalVacations = vacationInfo
    ? ROLES.reduce((sum, role) => sum + vacationInfo.byRole[role.key].length, 0)
    : 0

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="m-auto w-[90vw] max-w-sm rounded-2xl border-0 bg-surface p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-slide-up"
    >
      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight">{formatDateSpanish(dateKey)}</h2>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-150 active:scale-90"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {totalVacations === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">No hay vacaciones este dia</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ROLES.map((role) => {
              const employees = vacationInfo!.byRole[role.key]
              if (employees.length === 0) return null
              const exceeded = employees.length > role.maxVacaciones

              return (
                <div
                  key={role.key}
                  className={cn(
                    'rounded-xl p-3',
                    exceeded ? 'bg-danger-light' : 'bg-muted/60',
                  )}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={cn('size-3 rounded-full', role.colorClass)} />
                    <span className="text-sm font-semibold">{role.label}</span>
                    <span className="ml-auto text-xs font-medium text-muted-foreground">
                      {employees.length}/{role.maxVacaciones}
                    </span>
                    {exceeded && (
                      <span className="rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">
                        Excedido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {employees.map((name) => (
                      <span
                        key={name}
                        className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </dialog>
  )
}
