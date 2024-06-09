const express = require("express");
const routes = require("../routes");
const path = require("path");

// Function to setup middlewares for the Express application
function setupMiddlewares(app) {
  try {
    // Set EJS as the templating engine
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));
  } catch (error) {
    console.error("Error setting up EJS:", error);
  }

  try {
    // Set the static assets directory (for serving CSS, JavaScript, images, etc.)
    app.use(express.static(path.join(__dirname, "..", "public")));
  } catch (error) {
    console.error("Error setting up static directory:", error);
  }

  try {
    // Use the routes defined in the routes module
    app.use("/", routes);
  } catch (error) {
    console.error("Error setting up routes:", error);
  }

  // Error handling middleware for catching errors in routes
  app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Something went wrong!");
  });
}

// Export the setupMiddlewares function to be used in other modules
module.exports = { setupMiddlewares };
