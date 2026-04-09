import { useMemo } from 'react'
import transactions from '../data/transactions.json'
import { CardBalanceBlock } from '../components/CardBalanceBlock'
import { DailyPointsBlock } from '../components/DailyPointsBlock'
import { NoPaymentDueBlock } from '../components/NoPaymentDueBlock'
import { TransactionRow } from '../components/TransactionRow'
import type { Transaction } from '../types'
import { calculateDailyPoints, formatPoints } from '../utils/points'
import type { JSX } from 'react'

export interface TransactionsListProps {
  onSelect: (id: string) => void
}

const txns: Transaction[] = transactions as Transaction[]

export function TransactionsList({ onSelect }: TransactionsListProps): JSX.Element {
  const cardBalance = useMemo(() => parseFloat((Math.random() * 1500).toFixed(2)), [])
  const availableRaw = 1500 - cardBalance
  const pointsLabel = formatPoints(calculateDailyPoints())
  return (
    <div>
      <div className="px-4">
        <div className="flex flex-row gap-2 mt-4 mb-5 items-stretch">
          <div className="flex flex-[1.1] flex-col gap-2 min-w-0">
            <CardBalanceBlock balance={cardBalance} available={availableRaw} />
            <DailyPointsBlock points={pointsLabel} />
          </div>
          <NoPaymentDueBlock />
        </div>
      </div>
      <div className="text-[20px] font-bold text-black px-4 pt-0 pb-2">Latest Transactions</div>
      <div className="bg-white rounded-xl overflow-hidden mx-4 mb-4">
        {txns.map((t) => (
          <TransactionRow key={t.id} transaction={t} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
