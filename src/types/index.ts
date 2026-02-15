export type Role = 'cocina' | 'office' | 'sala' | 'abaceria'

export interface VacationPeriod {
  readonly empleado: string
  readonly puesto: Role
  readonly fechaInicio: string
  readonly fechaFin: string
}

export interface VacationData {
  readonly periods: ReadonlyArray<VacationPeriod>
  readonly csvHash: string
  readonly lastImport: string
}

export interface DayVacationInfo {
  readonly date: string
  readonly byRole: Readonly<Record<Role, ReadonlyArray<string>>>
}

export interface RoleConfig {
  readonly key: Role
  readonly label: string
  readonly colorClass: string
  readonly maxVacaciones: number
}

export type ImportState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly newRecords: number }
  | { readonly status: 'error'; readonly message: string }
  | { readonly status: 'no-changes' }
