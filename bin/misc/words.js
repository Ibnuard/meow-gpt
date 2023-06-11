const { randomInt } = require("../utils");
const _ = require("lodash");

const success = ["Berhasil😽", "Sukses😽", "Meoww😽", "Selesai😽"];
const failed = [
  "Maaf tidak berhasil😿",
  "Maaf belum berhasil😿",
  "Maaf ada yang salah😿",
  "Meow ada yang error😿",
];

const meow = ["Meow"];

const messageSuccess = _.sample(success);
const messageFailed = _.sample(failed);
const messageMeow = _.sample(meow);

module.exports = { messageSuccess, messageFailed, messageMeow };
