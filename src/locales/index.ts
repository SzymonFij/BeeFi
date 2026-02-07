import { pl } from './pl'
import type { LocaleKeys } from './pl'

export type { LocaleKeys }

const localeMap = {
  pl,
} as const

export type LocaleCode = keyof typeof localeMap

export function getLocale(code: LocaleCode = 'pl'): LocaleKeys {
  return localeMap[code] ?? localeMap.pl
}

// Dla przyszłej integracji i18n (np. react-i18next) można podmienić getLocale na hook useTranslation.
export { pl }
