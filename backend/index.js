require("dotenv").config();
const alpaca = require("./alpaca");
const getHistoricalData = require("./getHistoricalData");
const bullishEngulfingStrategy = require("./strategies/bullishEngulfing");
const bearishEngulfingStrategy = require("./strategies/bearishEngulfing");
const emaCrossoverStrategy = require("./strategies/emaCrossover");
const rsiStrategy = require("./strategies/rsiStrategy");
const bollingerBandsStrategy = require("./strategies/bollingerBandsStrategy");
const { log, getLogs, clearLogs } = require("./utils/logger");  // Import the logger

const FIFTEEN_MINUTES = 15 * 60 * 1000;

const extractOrderDetails = (orderDetails) => {
  if (!orderDetails) return null;

  return {
    side: orderDetails.side,
    qty: orderDetails.qty,
    stop_loss: orderDetails.stop_loss ? orderDetails.stop_loss.stop_price : 'N/A',
    take_profit: orderDetails.take_profit ? orderDetails.take_profit.limit_price : 'N/A',
    type: orderDetails.type,
    time_in_force: orderDetails.time_in_force
  };
};

const runStrategy = async (symbol, strategy) => {
  try {
    // Retrieve historical bar data
    const bars = await getHistoricalData(symbol, {
      start: new Date(new Date().setDate(new Date().getDate() - 50)), // Ensure enough data
      end: new Date(new Date().getTime() - FIFTEEN_MINUTES),
      timeframe: "1Hour",
    });

    // Ensure there is enough data
    if (!bars || bars.length < 50) {
      throw new Error("Not enough data to identify the pattern");
    }

    // Determine if there is a pattern
    const orderDetails = strategy.execute(symbol, bars);

    // If a pattern is identified, create the order
    if (orderDetails) {
      const formattedOrderDetails = extractOrderDetails(orderDetails);
      log(`Executing strategy: ${strategy.name} for ${symbol}`);
      log(`Order Details: ${JSON.stringify(formattedOrderDetails)}`);
      await alpaca.createOrder(orderDetails);
      log(`Order placed for ${symbol} using strategy: ${strategy.name}`);
    } else {
      log(`No pattern identified for strategy: ${strategy.name} for ${symbol}. No order created.`);
    }
  } catch (error) {
    log(`Error executing strategy ${strategy.name} for ${symbol}: ${error.message}`);
  }
};

const runAllStrategiesForSymbols = async (symbols) => {
  try {
    log("Executing all strategies for symbols...");
    await Promise.all(symbols.flatMap(symbol => [
      runStrategy(symbol, bullishEngulfingStrategy),
      runStrategy(symbol, bearishEngulfingStrategy),
      runStrategy(symbol, emaCrossoverStrategy),
      runStrategy(symbol, rsiStrategy),
      runStrategy(symbol, bollingerBandsStrategy)
    ]));
    log("All strategies executed for all symbols.");
  } catch (error) {
    log("Error executing strategies: " + error.message);
  }
};

// Example usage for testing
async function testFunction() {
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN",];
  log("Testing function execution...");
  await runAllStrategiesForSymbols(symbols);
  log("Function executed without errors");
}

testFunction()
  .then(() => log("All strategies executed successfully"))
  .catch(error => log("Execution failed: " + error.message));

// Export the function and logging utilities
module.exports = {
  runAllStrategiesForSymbols,
  getLogs,
  clearLogs
};
