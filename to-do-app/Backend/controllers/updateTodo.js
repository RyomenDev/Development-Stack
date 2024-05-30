const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
  try {
    // extract basis on ID
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );
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
    else {
      // send JSON response
      res.status(200).json({
        success: true,
        data: response,
        message: "updated by Id data successfully",
      });
    }
  } catch (err) {
    console.log("Error Received -  updating data");
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
