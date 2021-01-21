const request = require("supertest");

const loadEnv = require("../../loaders/env");
const loadMongoose = require("../../loaders/mongoose");
const loadExpress = require("../../loaders/express");

module.exports = {
  app: null,
  mongoose: null,
  server: null,
  request: null,
  async initialize() {
    loadEnv();
    const { mongoose } = await loadMongoose();
    const { app, server } = await loadExpress();

    await mongoose.connection.db.dropDatabase();

    this.request = request(app);
    this.app = app;
    this.mongoose = mongoose;
    this.server = server;
  },
  async terminate() {
    await this.mongoose.connection.db.dropDatabase();
    await this.mongoose.connection.close();
    await this.server.close();
  }
};
