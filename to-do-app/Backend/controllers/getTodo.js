const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // create todo object & get from DB
    // find used to fetch
    const response = await Todo.find({}); // fetch all
    // send JSON response
    res.status(200).json({
      success: true,
      data: response,
      message: "fetched data successfully",
    });
  } catch (err) {
    console.log("Error Received -  fetch data");
    console.error(err);
    console.log(err);
    res.status(500).json({
      // 500 - internal server error
      success: false,
      data: "internal server error - fetch data",
      message: err.message,
    });
  }
};
// module.exports={getTodo}

exports.getTodoById = async (req, res) => {
  try {
    // extract basis on ID
    const { id } = req.params;
    const response = await Todo.findById({ _id: id });
    // data with ID not found
    if (!response) {
      return res.status(404).json({
        // not found
        success: false,
        data: "data not found",
        message: "data not found",
      });
    } 
    // data found
    // else {
      // send JSON response
      res.status(200).json({
        success: true,
        data: response,
        message: "fetched by Id data successfully",
      });
    // }
  } catch (err) {
    console.log("Error Received -  fetch data");
    console.error(err);
    console.log(err);
    res.status(500).json({
      // 500 - internal server error
      success: false,
      data: "internal server error - fetch data by ID",
      message: err.message,
    });
  }
};
