const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./routes");

const app = express();

dotenv.config();
const { PORT } = process.env;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", routes);

app.use((req, res, next) => res.status(404).send("API not found"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
