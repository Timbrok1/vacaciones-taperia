import { useState } from 'react'
import { useVacations } from '@/hooks/useVacations'
import { useCalendar } from '@/hooks/useCalendar'
import { useImport } from '@/hooks/useImport'
import { Header } from '@/components/Header'
import { Calendar } from '@/components/Calendar'
import { Legend } from '@/components/Legend'
import { DayModal } from '@/components/DayModal'
import { ImportButton } from '@/components/ImportButton'

export function App() {
  const { currentHash, lastImport, updateData, getVacationsForDay } = useVacations()
  const { year, month, goToPrevMonth, goToNextMonth, goToToday } = useCalendar()
  const { importState, doImport, resetImportState } = useImport({ currentHash, updateData })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const selectedVacations = selectedDate ? getVacationsForDay(selectedDate) : null

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col">
      <Header
        year={year}
        month={month}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
        onToday={goToToday}
      />

      <main className="flex flex-1 flex-col gap-1 px-3 pb-6 pt-3">
        <Calendar
          year={year}
          month={month}
          getVacationsForDay={getVacationsForDay}
          onDaySelect={setSelectedDate}
        />

        <Legend />

        <div className="mt-auto pt-6">
          <ImportButton
            importState={importState}
            onImport={doImport}
            onReset={resetImportState}
            lastImport={lastImport}
          />
        </div>
      </main>

      <DayModal
        dateKey={selectedDate}
        vacationInfo={selectedVacations}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  )
}
