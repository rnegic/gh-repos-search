/**
 * Форматирует дату в читаемый вид
 * @param dateString - строка с датой в формате ISO
 * @returns отформатированная дата
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Форматирует число с разделителями тысяч
 * @param num - число для форматирования
 * @returns отформатированное число
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}
