import { useState, useCallback } from 'react'

export function useCalendar() {
  const now = new Date()
  const [date, setDate] = useState({ year: now.getFullYear(), month: now.getMonth() })

  const goToPrevMonth = useCallback(() => {
    setDate((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 },
    )
  }, [])

  const goToNextMonth = useCallback(() => {
    setDate((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 },
    )
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setDate({ year: today.getFullYear(), month: today.getMonth() })
  }, [])

  return { year: date.year, month: date.month, goToPrevMonth, goToNextMonth, goToToday }
}
