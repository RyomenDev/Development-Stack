// Module for file system operations
const fs = require("fs");
// Module for handling file paths
const path = require("path");

/**
 * Function to read content from a file.
 * param {string} filePath - The path of the file to be read.
 * returns {string} - The content of the file.
 */
function readDocument(filePath) {
  // Read file synchronously and convert buffer to string
  return fs.readFileSync(filePath, "utf8").toString();
}

/**
 * Function to append data to a file.
 * param {string} filePath - The path of the file to append data to.
 * param {string} data - The data to append to the file.
 */
function appendToFile(filePath, data) {
  // Append data to the file synchronously
  fs.appendFileSync(filePath, data + "\n");
}

// Exporting functions for use in other modules
module.exports = {
  readDocument,
  appendToFile,
};
