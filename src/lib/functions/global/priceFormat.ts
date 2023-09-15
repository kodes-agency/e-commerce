export function priceFormat(price: number | string) {
  if (typeof price === "string") {
    price = parseInt(price);
  }
  return (price / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function extractDigits(number, position) {
  if (typeof number === "string") {
    number = parseInt(number);
    if (isNaN(number)) {
      throw new Error("Invalid number format.");
    }
  }

  if (position === "first") {
    const digits = String(number);
    return digits.slice(0, -2); // Remove the last two digits
  } else if (position === "last") {
    const lastTwoDigits = number % 100;
    return lastTwoDigits.toString().padStart(2, "0"); // Ensure it always has two digits
  } else {
    throw new Error("Invalid position parameter. Use 'first' or 'last'.");
  }
}