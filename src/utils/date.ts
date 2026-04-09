function startOfLocalDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function formatTransactionDate(dateStr: string): string {
  const parsed = new Date(dateStr)
  const transDay = startOfLocalDay(parsed)
  const todayDay = startOfLocalDay(new Date())
  const diff = Math.round((todayDay.getTime() - transDay.getTime()) / MS_PER_DAY)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff >= 2 && diff <= 6) return WEEKDAYS[parsed.getDay()]
  const m = parsed.getMonth() + 1
  const day = parsed.getDate()
  const yy = parsed.getFullYear() % 100
  return `${m}/${day}/${String(yy).padStart(2, '0')}`
}
