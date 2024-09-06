import React, { useEffect, useState } from 'react';
import Card from '../components/Card';


const Home = () => {
    const [newsData, setNewsData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";
    
    // Mapping for categories
    const categories = {
        All: "Google OR Amazon OR Apple OR Microsoft OR American stock market",
        Google: "Google",
        Amazon: "Amazon",
        Apple: "Apple",
        Microsoft: "Microsoft",
        "American stock market": "American stock market"
    };

    const getData = async () => {
        const query = categories[selectedCategory];
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        let dt = jsonData.articles.slice(0, 9);
        setNewsData(dt);
    }

    useEffect(() => {
        getData();
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-6 text-center">
                <h1 className="text-3xl font-extrabold text-blue-600 mb-4 transition-colors duration-300 hover:text-blue-800">
                    Trading Bot Overview
                </h1>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            A trading bot is a powerful tool designed to automate trading decisions by executing predefined strategies based on real-time market data. The bot operates using five key strategies:
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            <strong className="font-bold text-black">1. Bearish Engulfing Strategy:</strong> Identifies a reversal pattern where a smaller bullish candle is followed by a larger bearish candle, signaling a potential downturn, and enters a sell position.
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            <strong className="font-bold text-black">2. Bullish Engulfing Strategy:</strong> Spots a smaller bearish candle followed by a larger bullish candle, indicating a shift to an uptrend, and takes a buy position.
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            <strong className="font-bold text-black">3. EMA Crossover Strategy:</strong> Monitors the crossover of two Exponential Moving Averages (EMAs) of different periods; a buy signal is triggered when the shorter EMA crosses above the longer one, and a sell signal when it crosses below.
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            <strong className="font-bold text-black">4. RSI Strategy:</strong> Uses the Relative Strength Index to detect overbought or oversold conditions in the market; the bot sells when the RSI is above 70 and buys when it’s below 30, anticipating price reversals.
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg text-gray-700">
                            <strong className="font-bold text-black">5. Bollinger Bands Strategy:</strong> Leverages price volatility by buying when the price touches or falls below the lower Bollinger Band and selling when it reaches or exceeds the upper band.
                        </p>
                    </div>

                    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <p className="text-lg font-semibold text-gray-800">
                            These strategies enable the trading bot to navigate the complexities of the market, executing trades with precision and minimizing the need for human intervention. The bot currently analyzes news related to major companies like <strong className="font-bold text-blue-600">Amazon, Apple, Microsoft, and Google</strong>, as well as the broader <strong className="font-bold text-blue-600">American stock market</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dropdown for selecting news category */}
            <div className="text-center py-4">
                <select
                    className="p-2 border border-gray-300 rounded-lg"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-center py-8">
                <p className="text-3xl font-bold text-gray-900">Stay Updated with Trendy News</p>
            </div>

            <div className="p-4">
                {newsData ? <Card data={newsData} /> : <p className="text-center text-gray-600">Loading...</p>}
            </div>
        </div>
    );
}

export default Home;
