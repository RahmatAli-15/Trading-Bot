module.exports = {
  name: 'EMA Crossover',
  execute: (symbol, candles) => {
    if (!symbol || !candles || candles.length < 50) {
      return null;
    }

    // Define the periods for EMA
    const SHORT_PERIOD = 12;
    const LONG_PERIOD = 26;

    const shortEMA = (period) => {
      // Calculate the short-term EMA
      // Placeholder for actual EMA calculation
      return candles.slice(-period).reduce((acc, candle) => acc + candle.ClosePrice, 0) / period;
    };

    const longEMA = (period) => {
      // Calculate the long-term EMA
      // Placeholder for actual EMA calculation
      return candles.slice(-period).reduce((acc, candle) => acc + candle.ClosePrice, 0) / period;
    };

    const shortEmaValue = shortEMA(SHORT_PERIOD);
    const longEmaValue = longEMA(LONG_PERIOD);

    // Check for EMA crossover
    const previousShortEma = shortEMA(SHORT_PERIOD + 1);
    const previousLongEma = longEMA(LONG_PERIOD + 1);

    const isBullishCrossover =
      previousShortEma < previousLongEma && shortEmaValue > longEmaValue;

    const isBearishCrossover =
      previousShortEma > previousLongEma && shortEmaValue < longEmaValue;

    if (isBullishCrossover) {
      const currentPrice = candles[candles.length - 1].ClosePrice;
      const stopLossPrice = Math.round(currentPrice * 0.98 * 100) / 100;
      const takeProfitPrice = Math.round(currentPrice * 1.05 * 100) / 100;

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

    if (isBearishCrossover) {
      const currentPrice = candles[candles.length - 1].ClosePrice;
      const stopLossPrice = Math.round(currentPrice * 1.02 * 100) / 100;
      const takeProfitPrice = Math.round(currentPrice * 0.95 * 100) / 100;

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
