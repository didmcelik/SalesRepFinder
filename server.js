const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./src/controllers/routes");
// database config
const app = express();
app.use(express.json()); //parse incoming request body in JSON format

// establishing a database connection
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}?authSource=admin`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);
//listen for incoming requests
const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});
