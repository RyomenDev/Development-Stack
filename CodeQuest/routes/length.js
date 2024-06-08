const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to hold the length file content as a string
let lengthstr;

try {
  // Construct the file path for the length file
  const filePath = path.join(__dirname, "../files/Length.txt");

  // Read the content of the length file
  lengthstr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content
  // lengthstr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'Length.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading length file:", error);
  }
}

// Split the length file content into an array of strings, each representing a line
const length = lengthstr.split("\n");

// Convert each string in the array to a number
for (let i = 0; i < length.length; i++) {
  length[i] = Number(length[i]);
}

// Export the array of lengths
module.exports = length;
