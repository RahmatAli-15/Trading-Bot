import React, { useState, useRef } from 'react';

// Strategy data with image paths
const strategies = [
  {
    name: 'Bearish Engulfing Strategy',
    shortDescription: 'A reversal pattern where a smaller bullish candle is followed by a larger bearish candle.',
    fullDescription: 'The Bearish Engulfing Strategy is a technical analysis pattern used to identify potential market reversals from an uptrend to a downtrend. This pattern occurs when a smaller bullish candlestick, characterized by a close higher than its open, is followed by a larger bearish candlestick that completely engulfs the body of the previous candle. This engulfing pattern signals a shift in market sentiment, where the increasing selling pressure overtakes the previous buying momentum. Traders often use this pattern to anticipate a bearish reversal, entering sell positions at the close of the bearish candlestick. To confirm the signal, additional indicators or volume analysis may be employed, as relying solely on this pattern can sometimes lead to false signals. Despite its effectiveness in spotting short-term reversals, it is crucial to manage risk appropriately by setting stop-loss orders above the engulfing candles high and targeting profit based on risk-reward ratios.',
    image: 'https://www.thinkmarkets.com/getmedia/b35bbf54-f9e5-4090-a3ae-155c631dcdb8/Bearish-Engulfing-candlestick-pattern.png' // Update with actual image path
  },
  {
    name: 'Bullish Engulfing Strategy',
    shortDescription: 'A reversal pattern from a downtrend to an uptrend.',
    fullDescription: 'The Bullish Engulfing Strategy is a technical analysis method used to identify potential bullish reversals in price trends. This strategy focuses on the Bullish Engulfing Pattern, which occurs when a small bearish candlestick is followed by a larger bullish candlestick that completely engulfs the body of the previous candle. This pattern suggests a shift in momentum from sellers to buyers, indicating a possible end to a downtrend and the start of an upward movement. Traders often use this pattern in combination with other indicators and volume analysis to confirm the signal and manage risk. While effective in spotting potential reversals, it’s important to consider the broader market context and apply proper risk management to mitigate the impact of false signals.',
    image: 'https://www.thinkmarkets.com/getmedia/4908dd05-65dd-4e63-8e2c-91688f3ef6cd/Bullish-Engulfing-candlestick-pattern-(Outside-Bar).png' // Update with actual image path
  },
  {
    name: 'EMA Crossover Strategy',
    shortDescription: 'Monitoring the crossover between two EMAs of different periods.',
    fullDescription: 'The EMA Crossover Strategy is a technical trading approach that uses the crossing of two Exponential Moving Averages (EMAs) to identify potential buy or sell signals. This strategy typically involves a short-term EMA and a long-term EMA, such as the 9-day and 21-day EMAs. A bullish signal is generated when the short-term EMA crosses above the long-term EMA, suggesting a possible upward trend, while a bearish signal occurs when the short-term EMA crosses below the long-term EMA, indicating a potential downward trend. The strategy offers clear entry and exit points, with traders often placing stop-loss orders to manage risk and setting profit targets based on technical levels. While effective in trending markets, the EMA Crossover Strategy can produce false signals in choppy conditions and may lag behind actual price movements due to its reliance on past data.',
    image: 'https://financetrain.sgp1.cdn.digitaloceanspaces.com/moving-average-crossover-904x1024.png' // Update with actual image path
  },
  {
    name: 'RSI Strategy',
    shortDescription: 'Identifying overbought or oversold conditions using RSI levels.',
    fullDescription: 'The RSI (Relative Strength Index) Strategy is a popular technical analysis tool used to identify overbought or oversold conditions in a market, helping traders pinpoint potential reversal points. The RSI is a momentum oscillator that ranges from 0 to 100, with readings above 70 indicating overbought conditions and readings below 30 suggesting oversold conditions. A common approach is to buy when the RSI crosses above the 30 level from below, signaling potential upward momentum, and to sell when it crosses below the 70 level from above, indicating potential downward pressure. Traders often use the RSI in conjunction with other indicators or price action to confirm signals and manage risk. While the RSI Strategy can be effective for catching reversals and identifying potential trading opportunities, it may generate false signals during strong trends and requires careful analysis and risk management to improve accuracy.',
    image: 'https://coinner.co/img/articles/rsi.jpg' // Update with actual image path
  },
  {
    name: 'Bollinger Bands Strategy',
    shortDescription: 'Tracking price relative to its Bollinger Bands.',
    fullDescription: 'The Bollinger Bands Strategy is a technical analysis method that uses Bollinger Bands to gauge market volatility and identify potential trading opportunities. Bollinger Bands consist of a middle band (a simple moving average) and two outer bands that are standard deviations away from the middle band. When the price approaches the upper band, it may indicate overbought conditions and a potential sell signal, while touching the lower band may signal oversold conditions and a potential buy signal. Traders also watch for price movements within the bands: a squeeze, where the bands contract, often signals a period of low volatility and can precede significant price movements, whereas a breakout from the bands can indicate the continuation of the current trend. The strategy helps traders take advantage of volatility and potential reversals but requires careful consideration of market conditions to avoid false signals, especially in strong trending markets.',
    image: 'https://www.investopedia.com/thmb/KV3VjOB2mbopbSAK7BRLQK9aPGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dotdash_Final_Using_Bollinger_Bands_to_Gauge_Trends_Oct_2020-05-930d21dec96541f9b5aa38f1c5831bc1.jpg' // Update with actual image path
  }
];

const AboutStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const detailsRef = useRef(null);

  const handleStrategyClick = (strategy) => {
    setSelectedStrategy(strategy);

    // Scroll to the details section
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">About Strategy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
            onClick={() => handleStrategyClick(strategy)}
          >
            <img
              src={strategy.image}
              alt={strategy.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 text-center">{strategy.name}</h2>
            <p className="text-gray-700">{strategy.shortDescription}</p>
          </div>
        ))}
      </div>

      {selectedStrategy && (
        <div ref={detailsRef} className="mt-8 p-6 border border-gray-300 rounded-lg bg-white">
          <h2 className="text-xl font-bold mb-4 text-center">{selectedStrategy.name}</h2>
          <p className="text-gray-700 text-center">{selectedStrategy.fullDescription}</p>
          <button
            className="mt-4 text-blue-500 underline mx-auto block"
            onClick={() => setSelectedStrategy(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutStrategy;
