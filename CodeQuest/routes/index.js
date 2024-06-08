const express = require("express");
const router = express.Router();
const { performSearch } = require("../controllers/searchController");
const { renderQuestion } = require("../controllers/questionController");

// Log message to indicate that the routes index file has been loaded
// console.log("this is index of routes");

// Define route for the root URL ("/")
// Renders the index page
router.get("/", (req, res) => {
  res.render("index");
});

// Define route for search functionality ("/search")
// Calls the performSearch function from the searchController
router.get("/search", performSearch);

// Define route for rendering a specific question based on its ID ("/question/:id")
// Calls the renderQuestion function from the questionController
router.get("/question/:id", renderQuestion);

// Export the router object so it can be used in the main app
module.exports = router;
