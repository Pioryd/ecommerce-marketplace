const express = require("express");
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
// TODO czy na pewno to?
// czy na pewno taka ścieżka ? zy nie build? a reszta w src ?
app.use(express.static(__dirname + "/uploads"));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err);

  // TODO na pewno wysyłać "err?"
  // wątpię ze tak
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
