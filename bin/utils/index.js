const moment = require("moment/moment");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modeSelector() {
  const cm = moment().minutes();
  if (cm % 2 == 0) {
    return 1;
  } else {
    return 2;
  }
}

module.exports = { randomInt, modeSelector };
