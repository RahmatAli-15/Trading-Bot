module.exports = {
  name: 'RSI',
  execute: (symbol, candles) => {
    if (!symbol || !candles || candles.length < 14) {
      return null;
    }

    // Calculate RSI
    const calculateRSI = (candles) => {
      let gain = 0, loss = 0;
      for (let i = 1; i < candles.length; i++) {
        const change = candles[i].ClosePrice - candles[i - 1].ClosePrice;
        if (change > 0) gain += change;
        else loss -= change;
      }
      const averageGain = gain / 14;
      const averageLoss = loss / 14;
      const rs = averageGain / averageLoss;
      return 100 - (100 / (1 + rs));
    };

    const rsi = calculateRSI(candles);

    // Define thresholds
    const OVERBOUGHT = 70;
    const OVERSOLD = 30;

    if (rsi > OVERBOUGHT) {
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

    if (rsi < OVERSOLD) {
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

    return null;
  }
};
