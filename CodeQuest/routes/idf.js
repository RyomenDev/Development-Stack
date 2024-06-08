const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to hold the IDF file content as a string
let idfstr;

try {
  // Construct the file path for the IDF file
  const filePath = path.join(__dirname, "../files/IDF.txt");

  // Read the content of the IDF file
  idfstr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content
  // idfstr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'IDF.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading IDF file:", error);
  }
}

// Split the IDF file content into an array of strings, each representing a line
const idf = idfstr.split("\n");

// Convert each element of the array from a string to a number
for (let i = 0; i < idf.length; i++) {
  idf[i] = Number(idf[i]);
}

// Export the array of IDF values
module.exports = idf;
