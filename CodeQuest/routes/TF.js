const { readDocument } = require("../utils/fileUtils");
const path = require("path");

// Number of documents
const N = 3023;

// Initialize a 2D array for Term Frequency (TF)
let tf = new Array(N);

for (let i = 0; i < N; i++) {
  tf[i] = new Array(0);
}

// Read the content of the TF file
let TF;
try {
  const filePath = path.join(__dirname, "../files/TF.txt");
  TF = readDocument(filePath);
  // Alternatively, using fs.readFileSync to read the file content
  // TF = fs.readFileSync(filePath).toString();
} catch (error) {
  // Handle file not found error
  if (error.code === "ENOENT") {
    console.error("The file 'TF.txt' does not exist.");
  } else {
    // Handle any other errors that occur while reading the file
    console.error("Error reading TF file:", error);
  }
}

// Split the TF file content into an array of strings, each representing a line
const temp = TF.split("\n");

// Parse each line to populate the TF array
for (let k = 0; k < temp.length; k++) {
  const arr = temp[k].split(" ");
  const i = Number(arr[0]); // Document index
  const j = Number(arr[1]); // Keyword index
  const val = Number(arr[2]); // Term frequency value

  // Add the term frequency object to the respective document array
  tf[i].push({
    id: j,
    val: val,
  });
}

module.exports = tf;
