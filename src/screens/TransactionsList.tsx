import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import transactions from '../data/transactions.json'
import { TransactionIcon } from '../components/TransactionIcon'
import type { Transaction } from '../types'
import { formatTransactionDate } from '../utils/date'
import { calculateDailyPoints, formatPoints } from '../utils/points'

export interface TransactionsListProps {
  onSelect: (id: string) => void
}

const txns: Transaction[] = transactions as Transaction[]

function money(n: number): string {
  return `$${n.toFixed(2)}`
}

export function TransactionsList({ onSelect }: TransactionsListProps): JSX.Element {
  const cardBalance = useMemo(() => parseFloat((Math.random() * 1500).toFixed(2)), [])
  const available = (1500 - cardBalance).toFixed(2)
  const pointsLabel = formatPoints(calculateDailyPoints())
  return (
    <div>
      <div className="screen-pad">
        <div className="card top-card-grid">
          <div>
            <div className="label-muted">Card Balance</div>
            <div className="balance-value">{money(cardBalance)}</div>
            <div className="sub-muted">{`$${available} Available`}</div>
          </div>
          <div>
            <div className="due-title">No Payment Due</div>
            <div className="due-text">You&apos;ve paid your September balance.</div>
          </div>
        </div>
        <div className="card points-card-grid">
          <div>
            <div className="label-muted">Daily Points</div>
            <div className="points-value">{pointsLabel}</div>
          </div>
          <div className="points-check-wrap">
            <div className="points-check-circle">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
          </div>
        </div>
      </div>
      <div className="section-latest">Latest Transactions</div>
      <div className="tx-list">
        {txns.map((t) => {
          let line2 = t.pending ? `Pending · ${t.description}` : t.description
          if (t.authorizedUser) line2 += ` · ${t.authorizedUser}`
          line2 += ` · ${formatTransactionDate(t.date)}`
          return (
            <div key={t.id} className="tx-row" onClick={() => onSelect(t.id)} role="presentation">
              <TransactionIcon name={t.name} />
              <div className="tx-mid">
                <div className="tx-name">{t.name}</div>
                <div className="tx-desc">{line2}</div>
              </div>
              <div className="tx-right">
                <div className={t.type === 'Payment' ? 'tx-amt-pay' : 'tx-amt-credit'}>
                  {t.type === 'Payment' ? `+${money(t.amount)}` : money(t.amount)}
                </div>
                <div className="tx-cb">{`${t.cashbackPercent}%`}</div>
                <FontAwesomeIcon icon={faChevronRight} className="tx-chevron" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
