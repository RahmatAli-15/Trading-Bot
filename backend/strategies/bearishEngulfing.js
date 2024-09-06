module.exports = {
  name: 'Bearish Engulfing',
  execute: (symbol, candles) => {
    if (!symbol || !candles || candles.length < 2) {
      return null;
    }

    // Extract the last two candles
    const [secondLastCandle, lastCandle] = candles.slice(-2);

    // Check for a Bearish Engulfing pattern
    const isBearishEngulfing =
      secondLastCandle.OpenPrice < secondLastCandle.ClosePrice &&
      lastCandle.OpenPrice > lastCandle.ClosePrice &&
      lastCandle.OpenPrice >= secondLastCandle.ClosePrice &&
      lastCandle.ClosePrice <= secondLastCandle.OpenPrice;

    if (isBearishEngulfing) {
      const currentPrice = lastCandle.ClosePrice;
      const stopLossPrice = Math.round(secondLastCandle.HighPrice * 100) / 100;
      const takeProfitPrice = Math.round(currentPrice * 0.95 * 100) / 100; // Adjusted for a shorter time frame

      return {
        symbol: symbol,
        qty: 1,
        side: "sell",
        type: "market",
        time_in_force: "gtc",
        order_class: "bracket",
        stop_loss: {
          stop_price: stopLossPrice,
          limit_price: Math.round(stopLossPrice * 1.01 * 100) / 100,
        },
        take_profit: {
          limit_price: takeProfitPrice,
        },
      };
    }

    return null;
  }
};
