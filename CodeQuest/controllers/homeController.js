// Function to render the home page
function renderHome(req, res) {
  // Render the "index" view, typically the home page
  res.render("index");
}

// Export the renderHome function to be used in other modules
module.exports = { renderHome };
