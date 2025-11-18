export const formatNumber = (value, options = {}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  });
  return formatter.format(value ?? 0);
};

export const formatCurrency = (value, currency = "USD", options = {}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  });
  return formatter.format(value ?? 0);
};
