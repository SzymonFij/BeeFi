import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CurrencyCode = 'PLN' | 'EUR'

const EUR_TO_PLN = 4.32

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  formatPrice: (pricePln: number) => string
  formatPriceWithUnit: (pricePln: number, unitLabel: string) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('PLN')

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
  }, [])

  const formatPrice = useCallback(
    (pricePln: number): string => {
      const value = currency === 'EUR' ? pricePln / EUR_TO_PLN : pricePln
      const formatted = value.toFixed(2)
      const symbol = currency === 'EUR' ? '€' : 'zł'
      return `${formatted} ${symbol}`
    },
    [currency]
  )

  const formatPriceWithUnit = useCallback(
    (pricePln: number, unitLabel: string): string => {
      return `${formatPrice(pricePln)} / ${unitLabel}`
    },
    [formatPrice]
  )

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      formatPriceWithUnit,
    }),
    [currency, setCurrency, formatPrice, formatPriceWithUnit]
  )

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
