function seasonStartCandidates(anchorYear: number): Date[] {
  return [
    new Date(anchorYear, 2, 1),
    new Date(anchorYear, 5, 1),
    new Date(anchorYear, 8, 1),
    new Date(anchorYear, 11, 1),
  ]
}

function mostRecentSeasonStart(todayMidnight: Date): Date {
  const y = todayMidnight.getFullYear()
  const thisYear = seasonStartCandidates(y)
  const prevYearWinter = new Date(y - 1, 11, 1)
  const all = [...thisYear, prevYearWinter]
  let best: Date | null = null
  for (const c of all) {
    const cm = startOfLocalDay(c)
    if (cm.getTime() <= todayMidnight.getTime()) {
      if (!best || cm.getTime() > best.getTime()) best = cm
    }
  }
  if (best) return best
  return startOfLocalDay(new Date(y - 1, 11, 1))
}

function startOfLocalDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function calculateDailyPoints(): number {
  const today = startOfLocalDay(new Date())
  const seasonStart = mostRecentSeasonStart(today)
  const fullDays = Math.floor((today.getTime() - seasonStart.getTime()) / MS_PER_DAY)
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
