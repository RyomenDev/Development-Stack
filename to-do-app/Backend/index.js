const express = require("express");
const app = express();

// load environment variables from .env file
require("dotenv").config();

const PORT = process.env.PORT || 3000; // default port 3000

// middleware to parse JSON request body
app.use(express.json());

// connect to Db
const dbConnect = require("./config/database");
dbConnect();

// import routes for TODO API
const todoRoutes = require("./routes/todos");
// mount the todos api routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// default route
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/*
{
    "title": "this is title",
    "description": "first stage of learning"
}
http://localhost:3000/api/v1/createTodo
http://localhost:3000/api/v1/getTodo
http://localhost:3000/api/v1/getTodoById/_id

http://localhost:3000/api/v1/updateTodo/_id
http://localhost:3000/api/v1/deleteTodo/_id
*/
