import { formatNumber } from "./format.currency";

export function conCatPermission(value: any): any {
  return value.map((item: { name: string }) => item.name).join(", ");
}

export function conCatString(value: any): any {
  return value.map((item: { name: string }) => item.name).join(", ");
}

export function conCatServiceChargePrices(value: any): any {
  return value
    .map((item: any) => `${formatNumber(item.service_charge, item.currency)}`)
    .join(" / ");
}

export function conCatAndTotalServiceChargePrices(
  value: any,
  qty: number
): any {
  return value
    .map(
      (item: any) => `${formatNumber(qty * item.service_charge, item.currency)}`
    )
    .join(" / ");
}
