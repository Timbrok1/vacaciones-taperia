import type { Role, RoleConfig } from '@/types'

export const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRQCNTZx2prh5lni3WiprAx5yiKLdSXF31SfmcTEAcfw4h-AP4sFQlxoeF9yPUiLA/pub?gid=2033922926&single=true&output=csv'

export const ROLES: ReadonlyArray<RoleConfig> = [
  {
    key: 'cocina',
    label: 'Cocina',
    colorClass: 'bg-cocina',
    maxVacaciones: 2,
  },
  {
    key: 'office',
    label: 'Office',
    colorClass: 'bg-office',
    maxVacaciones: 1,
  },
  {
    key: 'sala',
    label: 'Sala',
    colorClass: 'bg-sala',
    maxVacaciones: 1,
  },
  {
    key: 'abaceria',
    label: 'Abaceria',
    colorClass: 'bg-abaceria',
    maxVacaciones: 1,
  },
  {
    key: 'baja',
    label: 'Baja',
    colorClass: 'bg-baja',
  },
]

export const ROLE_MAP: Readonly<Record<Role, RoleConfig>> = Object.fromEntries(
  ROLES.map((r) => [r.key, r]),
) as Record<Role, RoleConfig>

export const STORAGE_KEY = 'vacaciones-taperia-data'
