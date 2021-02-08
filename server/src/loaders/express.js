const path = require("path");
const express = require("express");
const cors = require("cors");

const routes = require("../routes");

const app = express();

module.exports = async function () {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.use("/", routes);

  if (process.env.WEB_SERVER === "true") {
    app.use(express.static(path.join(__dirname, "../..", "build")));
    app.get("/*", (req, res) =>
      res.sendFile(path.join(__dirname, "../..", "build", "index.html"))
    );
  }

  app.use((req, res, next) => res.status(404).send("API not found"));
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message);
  });

  const server = app.listen(process.env.PORT, () =>
    console.log(
      `[${process.env.NODE_ENV}]Server is running on port: ${process.env.PORT}`
    )
  );

  return { app, server };
};
