require("dotenv").config();
const express = require("express");
const { runAllStrategiesForSymbols, getLogs, clearLogs } = require("./index.js");
const cors = require("cors");  // Import the cors package

const app = express();
const PORT = process.env.PORT || 5000;
// Use the CORS middleware
app.use(cors());

// Rate limit management
const rateLimit = {
  maxRequests: 10, // Adjust based on API limits
  windowMs: 60000, // 1 minute window
  requests: 0,
  start: Date.now()
};

const checkRateLimit = () => {
  const now = Date.now();
  if (now - rateLimit.start > rateLimit.windowMs) {
    rateLimit.start = now;
    rateLimit.requests = 0;
  }
  if (rateLimit.requests >= rateLimit.maxRequests) {
    throw new Error('Rate limit exceeded');
  }
  rateLimit.requests++;
};

// Retry mechanism with exponential backoff
const retry = async (fn, retries = 3, delay = 2000) => {
  try {
    return await fn();
  } catch (err) {
    if (err.message === 'Rate limit exceeded' && retries > 0) {
      console.log(`Rate limit error: Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay * 2);
    } else {
      throw err;
    }
  }
};

// Throttle mechanism to limit the number of requests per time frame
const throttle = (fn, limit) => {
  let lastCall = 0;
  return async (...args) => {
    checkRateLimit();  // Check and update rate limit status
    const now = Date.now();
    if (now - lastCall < limit) {
      await new Promise(resolve => setTimeout(resolve, limit - (now - lastCall)));
    }
    lastCall = now;
    return fn(...args);
  };
};

const runStrategiesThrottled = throttle(async (symbols) => {
  await retry(() => runAllStrategiesForSymbols(symbols));
}, 5000); // Adjust the limit (e.g., 5000ms for 5 seconds)

app.get("/api/run-strategies", async (req, res) => {
  const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN"];
  clearLogs();  // Clear previous logs
  try {
    await runStrategiesThrottled(symbols);  // Use throttled function
    const logs = getLogs();  // Retrieve logs
    res.status(200).send(`${logs}`);  // Send logs as HTML
  } catch (error) {
    console.error("Error executing strategies:", error);
    res.status(500).send("Error executing strategies: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
