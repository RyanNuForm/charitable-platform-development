export type CurrencyCode = "USD" | "GBP" | "EUR"

export type Currency = {
  code: CurrencyCode
  symbol: string
  label: string
  // USD value of 1 unit of this currency (e.g. £1 = $1.30).
  usdPerUnit: number
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "US Dollars", usdPerUnit: 1 },
  { code: "GBP", symbol: "£", label: "British Pounds", usdPerUnit: 1.3 },
  { code: "EUR", symbol: "€", label: "Euros", usdPerUnit: 1.1 },
]

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]
}

// Convert a base amount in USD into the target currency.
export function convertFromUsd(usdAmount: number, code: CurrencyCode): number {
  return usdAmount / getCurrency(code).usdPerUnit
}

// Format an already-converted amount with the currency symbol.
export function formatAmount(amount: number, code: CurrencyCode): string {
  const { symbol } = getCurrency(code)
  const rounded = Math.round(amount)
  return `${symbol}${rounded.toLocaleString("en-US")}`
}
