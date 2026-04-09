import type { JSX } from 'react'

function money(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export interface CardBalanceBlockProps {
  balance: number
  available: number
}

export function CardBalanceBlock({ balance, available }: CardBalanceBlockProps): JSX.Element {
  return (
    <div className="w-full bg-white rounded-xl p-3">
      <div className="text-[11px] text-[#8e8e93] font-normal mb-0.5">Card Balance</div>
      <div className="text-[26px] font-bold text-black leading-none">{`$${money(balance)}`}</div>
      <div className="text-[11px] text-[#8e8e93] mt-1">{`$${money(available)} Available`}</div>
    </div>
  )
}
