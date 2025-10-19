export const transactionTypeOptions = [
  {
    label: 'Store Transactions',
    value: 'store_transactions',
    key: 'store_transactions',
    props: ['transactions', 'store_transactions'],
  },
  {
    label: 'Get Tipped',
    value: 'get_tipped',
    key: 'get_tipped',
    props: ['transactions', 'get_tipped'],
  },
  {
    label: 'Withdrawals',
    value: 'withdrawals',
    key: 'withdrawals',
    props: ['transactions', 'withdrawals'],
  },
  {
    label: 'Chargebacks',
    value: 'chargebacks',
    key: 'chargebacks',
    props: ['transactions', 'chargebacks'],
  },
  {
    label: 'Cashbacks',
    value: 'cashbacks',
    key: 'cashbacks',
    props: ['transactions', 'cashbacks'],
  },
  {
    label: 'Refer & Earn',
    value: 'refer_and_earn',
    key: 'refer_and_earn',
    props: ['referrals', 'refer_and_earn'],
  },
]
export const transactionStatusOptions = [
  {
    label: 'Successful',
    value: 'successful',
    key: 'successful',
  },
  {
    label: 'Pending',
    value: 'pending',
    key: 'pending',
  },
  {
    label: 'Failed',
    value: 'failed',
    key: 'failed',
  },
]
