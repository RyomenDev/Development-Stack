const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to store the content of the URLs file
let urlsstr;

try {
  // Define the file path to the problem URLs file
  const filePath = path.join(__dirname, "../problem-urls.txt");

  // Read the content of the problem URLs file using the readDocument utility function
  urlsstr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content directly
  // urlsstr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle the file not found error specifically
  if (error.code === "ENOENT") {
    console.error("The file 'problem-urls.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading problem-urls file:", error);
  }
}

// Split the file content into an array of URLs, each line representing a URL
const urls = urlsstr.split("\n");

// Export the urls array for use in other modules
module.exports = urls;
