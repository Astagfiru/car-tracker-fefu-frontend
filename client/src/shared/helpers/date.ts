import { format } from 'date-fns'
import { ru } from 'date-fns/locale' // eslint-disable-line

export function formatDateRuLocale(date: string | Date): string {
  return format(new Date(date), 'd MMMM yyyy', { locale: ru })
}