export const CURRENCY_RATES = {
  es: { rate: 1, symbol: '$', code: 'MXN', locale: 'es-MX' },
  en: { rate: 0.05, symbol: '$', code: 'USD', locale: 'en-US' },
  'en-GB': { rate: 0.038, symbol: '£', code: 'GBP', locale: 'en-GB' },
  fr: { rate: 0.045, symbol: '€', code: 'EUR', locale: 'fr-FR' },
  de: { rate: 0.045, symbol: '€', code: 'EUR', locale: 'de-DE' },
  zh: { rate: 0.36, symbol: '¥', code: 'CNY', locale: 'zh-CN' },
  ru: { rate: 5.0, symbol: '₽', code: 'RUB', locale: 'ru-RU' },
};

export const formatPrice = (amountInMXN: number, language: string) => {
  const currency = CURRENCY_RATES[language as keyof typeof CURRENCY_RATES] || CURRENCY_RATES.es;
  const convertedAmount = amountInMXN * currency.rate;
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedAmount);
};

export const convertToMXN = (amount: number, language: string) => {
  const currency = CURRENCY_RATES[language as keyof typeof CURRENCY_RATES] || CURRENCY_RATES.es;
  return amount / currency.rate;
};

export const convertFromMXN = (amountInMXN: number, language: string) => {
  const currency = CURRENCY_RATES[language as keyof typeof CURRENCY_RATES] || CURRENCY_RATES.es;
  return amountInMXN * currency.rate;
};
