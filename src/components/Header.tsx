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
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-lg" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onPrev}
          className="flex size-10 items-center justify-center rounded-xl text-xl text-primary active:scale-90 active:bg-muted transition-all duration-150"
          aria-label="Mes anterior"
        >
          &#8249;
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-lg font-bold tracking-tight">{formatMonthYear(year, month)}</h1>
          <button
            onClick={onToday}
            className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary active:scale-95 transition-transform duration-150"
          >
            Hoy
          </button>
        </div>

        <button
          onClick={onNext}
          className="flex size-10 items-center justify-center rounded-xl text-xl text-primary active:scale-90 active:bg-muted transition-all duration-150"
          aria-label="Mes siguiente"
        >
          &#8250;
        </button>
      </div>
      <div className="mx-4 h-px bg-border" />
    </header>
  )
}
