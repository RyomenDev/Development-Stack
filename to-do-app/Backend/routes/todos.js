const express = require("express");
const router = express.Router();

const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo} = require("../controllers/updateTodo");
const { deleteTodo} = require("../controllers/deleteTodo");
// define API route

// create

// routes are mapped with business logic which are present in controllers
router.post("/createTodo", createTodo); // mapped path to controller function

router.get("/getTodo", getTodo); //(path,HANDLER_NAME) , handler imported from controller

router.get("/getTodoById/:id", getTodoById);

router.put("/updateTodo/:id", updateTodo);

router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
