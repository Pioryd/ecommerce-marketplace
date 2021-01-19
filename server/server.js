const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();

async function createServer() {
  dotenv.config();

  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.use("/", routes);

  const server = app.listen(process.env.PORT, () =>
    console.log(`Server is running on port: ${process.env.PORT}`)
  );

  return { app, server, mongoose };
}

module.exports = { createServer };
