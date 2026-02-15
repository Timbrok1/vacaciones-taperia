import { useState, useCallback, useMemo } from 'react'
import type { VacationData, DayVacationInfo, Role } from '@/types'
import { STORAGE_KEY, ROLES } from '@/data/config'
import { getDateRange } from '@/utils/dates'

function loadFromStorage(): VacationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as VacationData
  } catch {
    return null
  }
}

function saveToStorage(data: VacationData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useVacations() {
  const [data, setData] = useState<VacationData | null>(loadFromStorage)

  const updateData = useCallback((newData: VacationData) => {
    saveToStorage(newData)
    setData(newData)
  }, [])

  const currentHash = data?.csvHash ?? null
  const lastImport = data?.lastImport ?? null
  const periods = data?.periods ?? []

  const vacationMap = useMemo(() => {
    const map = new Map<string, DayVacationInfo>()

    for (const period of periods) {
      const dates = getDateRange(period.fechaInicio, period.fechaFin)
      for (const dateStr of dates) {
        let info = map.get(dateStr)
        if (!info) {
          const emptyRoles = Object.fromEntries(
            ROLES.map((r) => [r.key, [] as string[]]),
          ) as Record<Role, string[]>
          info = { date: dateStr, byRole: emptyRoles }
          map.set(dateStr, info)
        }
        const mutableByRole = info.byRole as Record<Role, string[]>
        mutableByRole[period.puesto].push(period.empleado)
      }
    }

    return map
  }, [periods])

  const getVacationsForDay = useCallback(
    (dateKey: string): DayVacationInfo | null => {
      return vacationMap.get(dateKey) ?? null
    },
    [vacationMap],
  )

  return {
    currentHash,
    lastImport,
    periods,
    updateData,
    getVacationsForDay,
  }
}
