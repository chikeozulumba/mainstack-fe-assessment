import { format as DateFnsFormat, parse, parseISO } from 'date-fns'

export function formatDate(
  date: string | Date,
  options: {
    fromFormat?: string
    toFormat?: string
    isISO?: boolean
  } = {
    fromFormat: 'yyyy-MM-dd',
    toFormat: 'PPP',
    isISO: false,
  },
) {
  try {
    const { fromFormat, toFormat, isISO } = options
    const parsedDate = isISO
      ? parseISO(date instanceof Date ? date.toISOString() : date.toString())
      : parse(
          date instanceof Date ? date.toISOString() : date,
          fromFormat || '',
          new Date(),
        )
    return DateFnsFormat(parsedDate, toFormat || '').toString()
  } catch (error) {
    return 'Invalid date'
  }
}
