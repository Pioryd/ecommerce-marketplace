const loadEnv = require("./loaders/env");
const loadMongoose = require("./loaders/mongoose");
const loadExpress = require("./loaders/express");

async function load() {
  loadEnv();
  await loadMongoose();
  await loadExpress();
}

load();
