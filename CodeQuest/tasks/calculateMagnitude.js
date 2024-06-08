const { appendToFile } = require("../utils/fileUtils");

/**
 * Calculates the magnitude of TFIDF vectors for each document and writes the result to a file.
 * param {number[][]} TFIDF - The TFIDF matrix containing TFIDF values for each document.
 */
function calculateMagnitude(TFIDF) {
  // Get the total number of documents
  const N = TFIDF.length;

  // Loop through each document
  for (let i = 0; i < N; i++) {
    // Initialize sum of squares for the current document
    let sqrsum = 0;
    // Loop through each term in the TFIDF vector of the current document
    for (let j = 0; j < TFIDF[i].length; j++) {
      // Add the square of each TFIDF value to the sum of squares
      sqrsum += TFIDF[i][j] * TFIDF[i][j];
    }
    // Calculate the square root of the sum of squares to get the magnitude
    const magnitude = Math.sqrt(sqrsum);
    // Append the magnitude to the Magnitude.txt file
    appendToFile("files/Magnitude.txt", magnitude);
  }

  // Log message indicating the completion of magnitude calculation
  console.log("Magnitude calculation completed");
}

// Export the function for use in other modules
module.exports = {
  calculateMagnitude,
};
