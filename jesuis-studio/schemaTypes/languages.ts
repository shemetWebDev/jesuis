export const LANGUAGES = [
  {id: 'ru', title: 'RU'},
  {id: 'en', title: 'EN'},
  {id: 'fr', title: 'FR'},
] as const

export function pickTitle(value?: Record<string, string | undefined>) {
  return value?.ru || value?.en || value?.fr || 'Untitled'
}
