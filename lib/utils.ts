export const knownQuotes = [
  //   "BTC",
  "USDT",
  //   "BUSD",
  //   "ETH",
  //   "PAX",
  //   "TUSD",
  //   "USDC",
];

export function splitSymbol(symbol: string) {
  for (let quote of knownQuotes) {
    if (symbol.endsWith(quote)) {
      return {
        base: symbol.slice(0, -quote.length),
        quote: quote,
      };
    }
  }
  // Fallback if no known quote is matched
  return { base: symbol, quote: "" };
}
