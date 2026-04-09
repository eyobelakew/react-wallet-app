import type { JSX } from 'react'

export interface DailyPointsBlockProps {
  points: string
}

export function DailyPointsBlock({ points }: DailyPointsBlockProps): JSX.Element {
  return (
    <div className="w-full bg-white rounded-xl p-3 flex flex-col">
      <span className="text-[11px] text-[#8e8e93] font-normal">Daily Points</span>
      <span className="text-[18px] font-semibold text-[#8e8e93] mt-0.5">{points}</span>
    </div>
  )
}
