import { useState, useCallback } from 'react'
import type { ImportState, VacationData } from '@/types'
import { GOOGLE_SHEET_CSV_URL } from '@/data/config'
import { parseCSV } from '@/utils/csv'
import { sha256 } from '@/utils/hash'

interface UseImportParams {
  readonly currentHash: string | null
  readonly updateData: (data: VacationData) => void
}

export function useImport({ currentHash, updateData }: Readonly<UseImportParams>) {
  const [importState, setImportState] = useState<ImportState>({ status: 'idle' })

  const doImport = useCallback(async () => {
    if (!GOOGLE_SHEET_CSV_URL) {
      setImportState({
        status: 'error',
        message: 'URL de Google Sheet no configurada.',
      })
      return
    }

    setImportState({ status: 'loading' })

    try {
      const bustUrl = `${GOOGLE_SHEET_CSV_URL}&_t=${Date.now()}`
      const response = await fetch(bustUrl, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const csvText = await response.text()
      const newHash = await sha256(csvText)

      if (newHash === currentHash) {
        setImportState({ status: 'no-changes' })
        return
      }

      const periods = parseCSV(csvText)

      const vacationData: VacationData = {
        periods,
        csvHash: newHash,
        lastImport: new Date().toISOString(),
      }

      updateData(vacationData)
      setImportState({ status: 'success', newRecords: periods.length })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setImportState({ status: 'error', message })
    }
  }, [currentHash, updateData])

  const resetImportState = useCallback(() => {
    setImportState({ status: 'idle' })
  }, [])

  return { importState, doImport, resetImportState }
}
