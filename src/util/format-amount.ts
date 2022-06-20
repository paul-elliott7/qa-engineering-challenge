const amountFormatter = Intl.NumberFormat("en", {
  style: "currency",
  currency: "GBP",
});

const formatAmount = (amount: number | undefined) =>
  typeof amount !== "undefined" ? amountFormatter.format(amount) : "-";

export { formatAmount };
