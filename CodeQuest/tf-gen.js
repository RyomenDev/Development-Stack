// Import required functions from different modules
const { calculateLength } = require("./tasks/calculateLength");
const { generateKeywords } = require("./tasks/generateKeywords");
const { calculateTF } = require("./tasks/calculateTF");
const { calculateIDF } = require("./tasks/calculateIDF");
const { calculateTFIDF } = require("./tasks/calculateTFIDF");
const { calculateMagnitude } = require("./tasks/calculateMagnitude");
const { appendToFile } = require("./utils/fileUtils");
const fs = require("fs");

// Number of documents
const N = 3023;

//! Step 1: Calculate Document Lengths
let docKeywords = calculateLength(N); // Calculate the length of each document
let sum = 0;
docKeywords.forEach((keywords) => {
  const length = keywords.length; // Get the length of keywords for each document
  sum += length; // Add the length to the sum
  appendToFile("files/length.txt", length); // Append the length to 'length.txt'
});

console.log("LENGTH DONE"); // Log completion of the length calculation

//! Step 2: Generate Keywords & Save
const { keywords } = generateKeywords(N, docKeywords); // Generate keywords from documents
keywords.forEach((word) => {
  fs.appendFileSync("files/keywords.txt", word + "\n"); // Append each keyword to 'keywords.txt'
});

console.log("Keywords DONE"); // Log completion of keyword generation

//! Step 3: Calculate TF (Term Frequency)
const TF = calculateTF(docKeywords, keywords); // Calculate term frequency
const W = keywords.length; // Number of unique keywords
for (let i = 0; i < N; i++) {
  for (let j = 0; j < W; j++) {
    if (TF[i][j] != 0) appendToFile("files/TF.txt", `${i} ${j} ${TF[i][j]}`); // Append non-zero TF values to 'TF.txt'
  }
}

console.log("TF DONE"); // Log completion of TF calculation

//! Step 4: Calculate IDF (Inverse Document Frequency)
const IDF = calculateIDF(TF); // Calculate inverse document frequency
IDF.forEach((idf) => appendToFile("files/IDF.txt", idf)); // Append each IDF value to 'IDF.txt'

console.log("IDF DONE"); // Log completion of IDF calculation

//! Step 5: Calculate TFIDF (TF * IDF)
const TFIDF = calculateTFIDF(TF, IDF); // Calculate TF-IDF values
for (let i = 0; i < N; i++) {
  for (let j = 0; j < W; j++) {
    if (TFIDF[i][j] != 0)
      appendToFile("files/TDIDF.txt", `${i} ${j} ${TFIDF[i][j]}`); // Append non-zero TFIDF values to 'TDIDF.txt'
  }
  appendToFile("files/TDIDF.txt", ""); // Append a new line after each document's TFIDF values
}

console.log("TFIDF DONE"); // Log completion of TFIDF calculation

//! Step 6: Calculate Magnitude
calculateMagnitude(TFIDF); // Calculate magnitude of TFIDF vectors

console.log("MAGNITUDE DONE"); // Log completion of magnitude calculation

console.log("All calculations done!"); // Log completion of all calculations

// const cosineSimilarity = require("./cosine_similarity");
// const documents = [
//   "The sky is Blue",
//   "The sun is bright today",
//   "The sun in the sky is bright",
//   "We can see the shining sun, the bright sun",
// ];

/** 
 * ["The sky is Blue",
  "The sun is bright today"
  "The sun in the sky is bright"
  "We can see the shining sun the bright sun"]
 * 
  "The sky is Blue\r"

  ["the", 'sky', 'is', 'Blue\r']
 * 
 
  [blue, bright, can see shining sky sun sun, today]
  [the], ['Blue', ''];
*/
