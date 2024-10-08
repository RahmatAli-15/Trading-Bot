module.exports = {
  name: 'Bullish Engulfing',
  execute: (symbol, candles) => {
    if (!symbol || !candles || candles.length < 2) {
      return null;
    }

    // Extract the last two candles
    const [secondLastCandle, lastCandle] = candles.slice(-2);

    // Check for a Bullish Engulfing pattern
    const isBullishEngulfing =
      secondLastCandle.OpenPrice > secondLastCandle.ClosePrice &&
      lastCandle.OpenPrice < lastCandle.ClosePrice &&
      lastCandle.OpenPrice <= secondLastCandle.ClosePrice &&
      lastCandle.ClosePrice >= secondLastCandle.OpenPrice;

    if (isBullishEngulfing) {
      const currentPrice = lastCandle.ClosePrice;
      const stopLossPrice = Math.round(secondLastCandle.LowPrice * 100) / 100;
      const takeProfitPrice = Math.round(currentPrice * 1.05 * 100) / 100; // Adjusted for a shorter time frame

      return {
        symbol: symbol,
        qty: 1,
        side: "buy",
        type: "market",
        time_in_force: "gtc",
        order_class: "bracket",
        stop_loss: {
          stop_price: stopLossPrice,
          limit_price: Math.round(stopLossPrice * 0.99 * 100) / 100,
        },
        take_profit: {
          limit_price: takeProfitPrice,
        },
      };
    }

    return null;
  }
};
