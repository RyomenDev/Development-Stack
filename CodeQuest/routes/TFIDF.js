const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Define the number of documents and keywords
const N = 2874; // Number of documents
const W = 37641; // Number of keywords

// Initialize a 2D array for TF-IDF values
const tfidf = new Array(N);

for (let i = 0; i < N; i++) {
  tfidf[i] = new Array(W).fill(0);
}

// Read the content of the TFIDF file
let TFIDF;
try {
  const filePath = path.join(__dirname, "../files/TFIDF.txt");
  TFIDF = readDocument(filePath);
  // Alternatively, using fs.readFileSync to read the file content
  // TFIDF = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'TFIDF.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading TFIDF.txt file:", error);
  }
}

// Split the TFIDF file content into an array of strings, each representing a line
const temp = TFIDF.split("\n");

// Parse each line to populate the TFIDF array
for (let k = 0; k < temp.length; k++) {
  const arr = temp[k].split(" ");
  const i = Number(arr[0]); // Document index
  const j = Number(arr[1]); // Keyword index
  const val = Number(arr[2]); // TFIDF value

  // Assign the TFIDF value to the respective document and keyword
  tfidf[i][j] = val;
}

module.exports = tfidf;
