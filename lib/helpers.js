export function formatNumber(price) {
  return new Intl.NumberFormat('is-IS', {maximumFractionDigits: 0}).format(price).replace(/\,/g, '.') + "kr.-";
}

