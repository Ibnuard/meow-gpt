const chalk = require("chalk");

const logError = chalk.bold.red;
const logSuccess = chalk.bold.green;
const logWarning = chalk.hex("#FFA500");

module.exports = { logError, logSuccess, logWarning };
