const MS_PER_DAY = 24 * 60 * 60 * 1000

function startOfLocalDay(d: Date): Date {
  const x = new Date(d.getTime())
  x.setHours(0, 0, 0, 0)
  return x
}

function localSeasonDate(year: number, monthIndex: number, day: number): Date {
  return startOfLocalDay(new Date(year, monthIndex, day))
}

function calendarDaysBetween(earlierMidnight: Date, laterMidnight: Date): number {
  const early = new Date(
    earlierMidnight.getFullYear(),
    earlierMidnight.getMonth(),
    earlierMidnight.getDate(),
    12,
    0,
    0,
    0,
  )
  const late = new Date(
    laterMidnight.getFullYear(),
    laterMidnight.getMonth(),
    laterMidnight.getDate(),
    12,
    0,
    0,
    0,
  )
  return Math.round((late.getTime() - early.getTime()) / MS_PER_DAY)
}

function mostRecentSeasonStart(todayMidnight: Date): Date {
  const y = todayMidnight.getFullYear()
  const candidates: Date[] = []
  for (const yr of [y - 1, y]) {
    candidates.push(
      localSeasonDate(yr, 2, 1),
      localSeasonDate(yr, 5, 1),
      localSeasonDate(yr, 8, 1),
      localSeasonDate(yr, 11, 1),
    )
  }
  let best: Date | null = null
  for (const c of candidates) {
    if (c.getTime() <= todayMidnight.getTime()) {
      if (!best || c.getTime() > best.getTime()) best = c
    }
  }
  if (best) return best
  return localSeasonDate(y - 1, 11, 1)
}

export function calculateDailyPoints(): number {
  const today = startOfLocalDay(new Date())
  const seasonStart = mostRecentSeasonStart(today)
  const fullDays = calendarDaysBetween(seasonStart, today)
  const dayOfSeason = fullDays + 1
  if (dayOfSeason <= 1) return Math.round(2)
  if (dayOfSeason === 2) return Math.round(3)
  let prev2 = 2
  let prev1 = 3
  for (let n = 3; n <= dayOfSeason; n++) {
    const cur = prev1 + 0.6 * prev2
    prev2 = prev1
    prev1 = cur
  }
  return Math.round(prev1)
}

export function formatPoints(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}K`
  return String(n)
}
