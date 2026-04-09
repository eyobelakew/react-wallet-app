import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import type { Transaction } from '../types'

export interface TransactionDetailProps {
  transaction: Transaction
  onBack: () => void
}

function formatDetailDateTime(dateStr: string): string {
  const d = new Date(dateStr)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const yy = d.getFullYear() % 100
  const h24 = d.getHours()
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const min = d.getMinutes()
  return `${m}/${day}/${String(yy).padStart(2, '0')}, ${h12}:${String(min).padStart(2, '0')}`
}

function money(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function TransactionDetail({ transaction: t, onBack }: TransactionDetailProps): JSX.Element {
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-[#f2f2f7]">
      <div className="h-11 pl-4 flex items-center">
        <button
          type="button"
          className="bg-transparent border-0 p-0 cursor-pointer text-[#007aff] text-xl flex items-center"
          onClick={onBack}
          aria-label="Back"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="text-center pt-8 px-4">
        <div className="text-[48px] font-bold text-black leading-none tracking-tight">{`$${money(t.amount)}`}</div>
        <div className="text-[14px] text-[#8e8e93] font-normal mt-2">{t.name}</div>
        <div className="text-[14px] text-[#8e8e93] font-normal mt-0.5">{formatDetailDateTime(t.date)}</div>
      </div>
      <div className="mt-8 mx-4 bg-white rounded-xl p-4">
        <span className="block text-sm font-bold text-black">Status: Approved</span>
        <span className="block text-[13px] text-[#8e8e93] font-normal mt-[3px]">{t.cardUsed}</span>
        <div className="h-px bg-[#e5e5ea] my-3 w-full" />
        <div className="flex justify-between text-sm text-black font-normal">
          <span>Total</span>
          <span>{`$${money(t.amount)}`}</span>
        </div>
      </div>
    </div>
  )
}
