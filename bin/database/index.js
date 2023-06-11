const Borgoose = require("borgoose");

//set path
const path = "./bin/database/";

//TESTING DATABASE
const dbTest = new Borgoose(path + "test.json", {
  syncOnWrite: true,
  createWithId: true,
});

exports.database = { dbTest };
