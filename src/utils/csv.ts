import type { VacationPeriod, Role } from '@/types'
import { parseDDMMYYYY } from './dates'

const ROLE_NORMALIZE: Readonly<Record<string, Role>> = {
  cocina: 'cocina',
  office: 'office',
  sala: 'sala',
  'abacería': 'abaceria',
  abaceria: 'abaceria',
}

export function parseCSV(csvText: string): VacationPeriod[] {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const periods: VacationPeriod[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const fields = parseCSVLine(line)
    if (fields.length < 4) continue

    const [empleado, puesto, fechaInicio, fechaFin] = fields.map((f) => f.trim())

    const role = ROLE_NORMALIZE[puesto.toLowerCase()]
    if (!role) continue

    try {
      periods.push({
        empleado,
        puesto: role,
        fechaInicio: parseDDMMYYYY(fechaInicio),
        fechaFin: parseDDMMYYYY(fechaFin),
      })
    } catch {
      continue
    }
  }

  return periods
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current)

  return fields
}
