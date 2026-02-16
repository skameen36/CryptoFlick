export const formatCurrency = (value, currency = 'USD') => {
  if (value === undefined || value === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0.00%';
  return `${value.toFixed(2)}%`;
};

export const formatCompactNumber = (number) => {
  if (number === undefined || number === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(number);
};
