/**
 * Calculates the TF-IDF (Term Frequency-Inverse Document Frequency) for each document and keyword.
 * param {number[][]} TF - Term Frequency matrix representing TF values for each document and keyword.
 * param {number[]} IDF - Inverse Document Frequency array containing IDF values for each keyword.
 * returns {number[][]} - TF-IDF matrix representing the TF-IDF values for each document and keyword.
 */
function calculateTFIDF(TF, IDF) {
  // Get the total number of documents (N) and total number of unique keywords (W)
  const N = TF.length;
  const W = IDF.length;
  // Initialize an empty TF-IDF matrix to store TF-IDF values for each document and keyword
  const TFIDF = new Array(N);

  // Iterate through each document and keyword to calculate TF-IDF value
  for (let i = 0; i < N; i++) {
    // Initialize an array for each document to store TF-IDF values for keywords
    TFIDF[i] = new Array(W);
    for (let j = 0; j < W; j++) {
      // Calculate TF-IDF value by multiplying TF value with IDF value
      TFIDF[i][j] = TF[i][j] * IDF[j];
    }
  }

  // Log message indicating the completion of TF-IDF calculation
  console.log("TF-IDF calculation completed");

  // Return the TF-IDF matrix
  return TFIDF;
}

// Export the calculateTFIDF function for use in other modules
module.exports = {
  calculateTFIDF,
};

//

// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < W; j++) {
//     if (TFIDF[i][j] != 0)
//       fs.appendFileSync("TFIDF.txt", i + " " + j + " " + TFIDF[i][j] + "\n");
//   }

//   fs.appendFileSync("TFIDF.txt", "\n".toString());
// }
