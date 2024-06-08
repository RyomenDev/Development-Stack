const express = require("express");
const path = require("path");

// Function to setup middlewares for the Express application
function setupMiddlewares(app) {
  // Setting EJS as our view engine
  app.set("view engine", "ejs");

  // Defining the path to our public assets folder
  // This middleware serves static files such as images, CSS files, and JavaScript files
  app.use(express.static(path.join(__dirname, "..", "public")));
}

// Export the setupMiddlewares function to be used in other modules
module.exports = { setupMiddlewares };
