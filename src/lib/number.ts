import numeral from 'numeral'

export function numberFormatter(value: number, format: string = '0,0.00') {
  return numeral(value).format(format).toString()
}
