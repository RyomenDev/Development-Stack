// Module for removing stopwords from text
const { removeStopwords } = require("stopword");
// Module for removing punctuation from text
const removePunc = require("remove-punctuation");

/**
 * Function to process a document by removing stopwords and punctuation.
 * param {string} document - The document content to be processed.
 * returns {string[]} - An array of processed words.
 */
function processDocument(document) {
  // Split the document into lines
  const lines = document.split("\n");
  // Array to store individual words from the document
  const docWords = [];

  // Loop through each line in the document
  lines.forEach((line) => {
    // Split each line into words
    const words = line.split(" ");
    // Loop through each word in the line
    words.forEach((word) => {
      // Remove carriage return if present
      word = word.split("\r")[0];
      // Add non-empty words to the array
      if (word.length) docWords.push(word);
    });
  });

  // Remove stopwords from the document words
  let processedWords = removeStopwords(docWords);
  // Sort the processed words alphabetically
  processedWords.sort();
  // Convert each word to lowercase and remove punctuation
  processedWords = processedWords
    .map((word) => removePunc(word.toLowerCase()))
    .filter((word) => word !== "");

  // Return the array of processed words
  return processedWords;
}

// Export the function for use in other modules
module.exports = {
  processDocument,
};
