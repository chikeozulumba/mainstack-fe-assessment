export type Transaction = {
  amount: number
  metadata?: {
    name: string
    type: string
    email: string
    quantity: number
    country: string
    product_name?: string
  }
  payment_reference?: string
  status: string
  type: string
  date: string
}

export type Wallet = {
  balance: number
  total_payout: number
  total_revenue: number
  pending_payout: number
  ledger_balance: number
}

export type User = {
  first_name: string
  last_name: string
  email: string
}

export type SelectedOption = {
  label: string
  value: string
  key: string
  [key: string]: any
}

export type TransactionTableRecord = {
  icon: JSX.Element
  title: string
  subtitle: string
  amount: string
  date: string
  status: string
}
