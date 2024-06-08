const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Declare a variable to hold the magnitude file content as a string
let magnitudestr;

try {
  // Construct the file path for the magnitude file
  const filePath = path.join(__dirname, "../files/Magnitude.txt");

  // Read the content of the magnitude file
  magnitudestr = readDocument(filePath);

  // Alternatively, using fs.readFileSync to read the file content
  // magnitudestr = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'Magnitude.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading magnitude file:", error);
  }
}

// Split the magnitude file content into an array of strings, each representing a line
const magnitude = magnitudestr.split("\n");

// Convert each string in the array to a number
for (let i = 0; i < magnitude.length; i++) {
  magnitude[i] = Number(magnitude[i]);
}

// Export the array of magnitudes
module.exports = magnitude;
