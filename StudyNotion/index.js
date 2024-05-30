//app create
const express = require("express");
const app = express();

// find port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//add middleware
app.use(express.json());

// connect database
const db = require("./config/database");
db.connect();

//activate server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
