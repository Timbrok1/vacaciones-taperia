import { formatMonthYear } from '@/utils/dates'

interface HeaderProps {
  readonly year: number
  readonly month: number
  readonly onPrev: () => void
  readonly onNext: () => void
  readonly onToday: () => void
}

export function Header({ year, month, onPrev, onNext, onToday }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-surface px-4 py-3">
      <button
        onClick={onPrev}
        className="flex size-9 items-center justify-center rounded-md text-lg hover:bg-muted"
        aria-label="Mes anterior"
      >
        &#8249;
      </button>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">{formatMonthYear(year, month)}</h1>
        <button
          onClick={onToday}
          className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted"
        >
          Hoy
        </button>
      </div>

      <button
        onClick={onNext}
        className="flex size-9 items-center justify-center rounded-md text-lg hover:bg-muted"
        aria-label="Mes siguiente"
      >
        &#8250;
      </button>
    </header>
  )
}
