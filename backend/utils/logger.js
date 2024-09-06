// utils/logger.js
let logMessages = [];

const log = (message) => {
  logMessages.push(message);
  console.log(message);  // Optionally keep logging to the console as well
};

const getLogs = () => {
  return logMessages.join('\n');
};

const clearLogs = () => {
  logMessages = [];
};

module.exports = {
  log,
  getLogs,
  clearLogs
};
