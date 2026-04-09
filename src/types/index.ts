export interface Transaction {
  id: string
  type: 'Credit' | 'Payment'
  amount: number
  name: string
  description: string
  date: string
  pending: boolean
  authorizedUser?: string
  cashbackPercent: number
  cardUsed: string
}
