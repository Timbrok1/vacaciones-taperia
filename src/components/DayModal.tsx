import { useEffect, useRef } from 'react'
import type { DayVacationInfo } from '@/types'
import { ROLES } from '@/data/config'
import { formatDateSpanish } from '@/utils/dates'

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
      className="m-auto w-[90vw] max-w-sm rounded-lg border bg-surface p-0 shadow-lg backdrop:bg-black/50 open:animate-slide-up"
    >
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">{formatDateSpanish(dateKey)}</h2>
          <button
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {totalVacations === 0 ? (
          <p className="text-sm text-muted-foreground">No hay vacaciones este dia.</p>
        ) : (
          <div className="space-y-3">
            {ROLES.map((role) => {
              const employees = vacationInfo!.byRole[role.key]
              if (employees.length === 0) return null
              const exceeded = employees.length > role.maxVacaciones

              return (
                <div key={role.key}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${role.colorClass}`} />
                    <span className="text-sm font-medium">{role.label}</span>
                    <span className="text-xs text-muted-foreground">
                      ({employees.length}/{role.maxVacaciones})
                    </span>
                    {exceeded && (
                      <span className="text-xs font-medium text-danger">Excedido</span>
                    )}
                  </div>
                  <ul className="ml-5 space-y-0.5">
                    {employees.map((name) => (
                      <li key={name} className="text-sm text-muted-foreground">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </dialog>
  )
}
