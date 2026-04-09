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
  return `$${n.toFixed(2)}`
}

export function TransactionDetail({ transaction: t, onBack }: TransactionDetailProps): JSX.Element {
  return (
    <div>
      <div className="detail-header">
        <button type="button" className="detail-back" onClick={onBack} aria-label="Back">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="detail-body">
        <div className="detail-amount">{money(t.amount)}</div>
        <div className="detail-name">{t.name}</div>
        <div className="detail-when">{formatDetailDateTime(t.date)}</div>
      </div>
      <div className="card detail-card">
        <div className="detail-status">Status: Approved</div>
        <div className="detail-card-line">{t.cardUsed}</div>
        <div className="detail-divider" />
        <div className="detail-total-row">
          <span>Total</span>
          <span>{money(t.amount)}</span>
        </div>
      </div>
    </div>
  )
}
