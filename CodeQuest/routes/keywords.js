const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to hold the keywords file content as a string
let keywordsstr;

try {
  // Construct the file path for the keywords file
  const filePath = path.join(__dirname, "../files/keywords.txt");

  // Read the content of the keywords file
  keywordsstr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content
  // keywordsstr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'keywords.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading keywords file:", error);
  }
}

// Split the keywords file content into an array of strings, each representing a line
const keywords = keywordsstr.split("\n");

// Export the array of keywords
module.exports = keywords;
