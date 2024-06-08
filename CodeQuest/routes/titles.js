const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to store the content of the titles file
let titlesstr;

try {
  // Define the file path to the problem titles file
  const filePath = path.join(__dirname, "../problem-titles.txt");

  // Read the content of the problem titles file using the readDocument utility function
  titlesstr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content directly
  // titlesstr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle the file not found error specifically
  if (error.code === "ENOENT") {
    console.error("The file 'problem-titles.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading problem-titles file:", error);
  }
}

// Split the file content into an array of titles, each line representing a title
const titles = titlesstr.split("\n");

// Export the titles array for use in other modules
module.exports = titles;
