module.exports = {
  name: 'Bollinger Bands',
  execute: (symbol, candles) => {
    if (!symbol || !candles || candles.length < 20) {
      return null;
    }

    // Calculate the Simple Moving Average (SMA) and Standard Deviation (SD)
    const calculateSMA = (data, period) => {
      if (data.length < period) return 0;
      const sum = data.slice(-period).reduce((acc, candle) => acc + candle.ClosePrice, 0);
      return sum / period;
    };

    const calculateSD = (data, period, sma) => {
      if (data.length < period) return 0;
      const variance = data.slice(-period)
        .reduce((acc, candle) => acc + Math.pow(candle.ClosePrice - sma, 2), 0) / period;
      return Math.sqrt(variance);
    };

    const period = 20; // Typical period for Bollinger Bands
    const sma = calculateSMA(candles, period);
    const sd = calculateSD(candles, period, sma);
    const upperBand = sma + (2 * sd); // Using 2 standard deviations
    const lowerBand = sma - (2 * sd); // Using 2 standard deviations

    const currentPrice = candles[candles.length - 1].ClosePrice;

    // Define thresholds for trading
    const isBuySignal = currentPrice <= lowerBand;
    const isSellSignal = currentPrice >= upperBand;

    if (isBuySignal) {
      const stopLossPrice = Math.round(lowerBand * 0.98 * 100) / 100;
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

    if (isSellSignal) {
      const stopLossPrice = Math.round(upperBand * 1.02 * 100) / 100;
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
