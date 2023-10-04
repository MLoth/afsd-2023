import { type I18nOptions, createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  zh: 'Chinees',
}

export const DEFAULT_LOCALE = 'nl'

export const i18nOptions: I18nOptions = {
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  legacy: false,
  messages: {
    en: {
      hello: 'hello world',
    },
    nl: {
      hello: 'hallo wereld',
    },
  },
}

export const i18n = createI18n(i18nOptions)
