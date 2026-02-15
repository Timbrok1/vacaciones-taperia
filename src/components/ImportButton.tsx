import { useEffect } from 'react'
import type { ImportState } from '@/types'
import { cn } from '@/lib/utils'

interface ImportButtonProps {
  readonly importState: ImportState
  readonly onImport: () => void
  readonly onReset: () => void
  readonly lastImport: string | null
}

export function ImportButton({ importState, onImport, onReset, lastImport }: ImportButtonProps) {
  useEffect(() => {
    if (importState.status === 'success' || importState.status === 'no-changes') {
      const timer = setTimeout(onReset, 3000)
      return () => clearTimeout(timer)
    }
  }, [importState.status, onReset])

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onImport}
        disabled={importState.status === 'loading'}
        className={cn(
          'rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors',
          'bg-foreground hover:bg-foreground/90',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {importState.status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Importando...
          </span>
        ) : (
          'Importar datos'
        )}
      </button>

      {importState.status === 'success' && (
        <p className="animate-fade-in text-xs text-green-600">
          {importState.newRecords} registros importados
        </p>
      )}

      {importState.status === 'no-changes' && (
        <p className="animate-fade-in text-xs text-muted-foreground">
          Sin cambios
        </p>
      )}

      {importState.status === 'error' && (
        <p className="animate-fade-in text-xs text-danger">
          {importState.message}
        </p>
      )}

      {lastImport && importState.status === 'idle' && (
        <p className="text-xs text-muted-foreground">
          Ultima importacion: {new Date(lastImport).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}
    </div>
  )
}
