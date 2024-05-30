const Todo = require("../models/todo");

exports.deleteTodo = async (req, res) => {
  try {
    // extract basis on ID
    const { id } = req.params;
    const response = await Todo.findByIdAndDelete({ _id: id });
    // send JSON response
    res.json({
      success: true,
      message: "deleted by Id data successfully",
    });
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
