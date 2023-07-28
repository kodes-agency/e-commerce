export function priceFormat(price: number | string) {
  if (typeof price === "string") {
    price = parseInt(price);
  }
  return (price / 100).toFixed(2);
}
