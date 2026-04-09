import { useState } from 'react'
import transactions from './data/transactions.json'
import { TransactionDetail } from './screens/TransactionDetail'
import { TransactionsList } from './screens/TransactionsList'
import type { Transaction } from './types'

type Screen = 'list' | 'detail'

const allTransactions: Transaction[] = transactions as Transaction[]

function App(): JSX.Element {
  const [screen, setScreen] = useState<Screen>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = allTransactions.find((t) => t.id === selectedId) ?? null
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-[#f2f2f7] overflow-x-hidden">
      {screen === 'list' && (
        <TransactionsList
          onSelect={(id) => {
            setSelectedId(id)
            setScreen('detail')
          }}
        />
      )}
      {screen === 'detail' && selected && (
        <TransactionDetail transaction={selected} onBack={() => setScreen('list')} />
      )}
    </div>
  )
}

export default App
