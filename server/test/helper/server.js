const request = require("supertest");

const { createServer } = require("../../server.js");

module.exports = {
  app: null,
  mongoose: null,
  server: null,
  request: null,
  async initialize() {
    const { app, mongoose, server } = await createServer();
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
