export function parseDDMMYYYY(dateStr: string): string {
  const [day, month, year] = dateStr.trim().split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export function getDateRange(startISO: string, endISO: string): string[] {
  const dates: string[] = []
  const [sy, sm, sd] = startISO.split('-').map(Number)
  const [ey, em, ed] = endISO.split('-').map(Number)
  const current = new Date(sy, sm - 1, sd)
  const end = new Date(ey, em - 1, ed)

  while (current <= end) {
    const y = current.getFullYear()
    const m = String(current.getMonth() + 1).padStart(2, '0')
    const d = String(current.getDate()).padStart(2, '0')
    dates.push(`${y}-${m}-${d}`)
    current.setDate(current.getDate() + 1)
  }

  return dates
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`
}

export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function formatDateSpanish(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number)
  return `${day} de ${MONTH_NAMES[month - 1]} ${year}`
}
