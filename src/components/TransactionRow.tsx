import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { TransactionIcon } from './TransactionIcon'
import type { Transaction } from '../types'
import { formatTransactionDate } from '../utils/date'
import type { JSX } from 'react'

function money(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function descriptionLine(t: Transaction): string {
  return t.pending ? `Pending - ${t.description}` : t.description
}

function dateLine(t: Transaction): string {
  if (t.authorizedUser) return `${t.authorizedUser} - ${formatTransactionDate(t.date)}`
  return formatTransactionDate(t.date)
}

export interface TransactionRowProps {
  transaction: Transaction
  onSelect: (id: string) => void
}

export function TransactionRow({ transaction: t, onSelect }: TransactionRowProps): JSX.Element {
  const amount = t.type === 'Payment' ? `+$${money(t.amount)}` : `$${money(t.amount)}`
  return (
    <div
      className="flex items-center px-3.5 py-[11px] gap-3 border-b border-[#f0f0f0] last:border-b-0 bg-white cursor-pointer"
      onClick={() => onSelect(t.id)}
      role="presentation"
    >
      <TransactionIcon name={t.name} />
      <div className="flex-1 min-w-0 flex flex-col">
        <span className="text-[14px] font-semibold text-black leading-[1.4]">{t.name}</span>
        <span className="text-[12px] text-[#8e8e93] leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis">
          {descriptionLine(t)}
        </span>
        <span className="text-[12px] text-[#8e8e93] leading-[1.4]">{dateLine(t)}</span>
      </div>
      <div className="flex flex-col items-end gap-0.5 shrink-0">
        <span className="text-[14px] font-semibold text-black">{amount}</span>
        <span className="text-[12px] text-[#8e8e93]">{t.cashbackPercent}%</span>
        <FontAwesomeIcon icon={faChevronRight} className="text-[#c7c7cc] text-[10px]" />
      </div>
    </div>
  )
}
