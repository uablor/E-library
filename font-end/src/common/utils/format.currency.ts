export function formatCurrency(value: any, data: any): any {
  return value.toLocaleString("en-US") + "" + data.currency;
}

export function formatNumber(value: any, currency?: string): any {
  return value.toLocaleString("en-US") + "" + currency;
}
