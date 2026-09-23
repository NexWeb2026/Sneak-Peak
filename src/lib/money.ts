export function priceToCents(price: string) {
  const amount = Number.parseFloat(price.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
