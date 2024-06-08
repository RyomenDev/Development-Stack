const { appendToFile } = require("../utils/fileUtils");

/**
 * Calculates the Inverse Document Frequency (IDF) for each term in the given TF matrix.
 * param {number[][]} TF - The Term Frequency (TF) matrix.
 * returns {number[]} - An array containing the IDF value for each term.
 */
function calculateIDF(TF) {
  // Get the number of documents (N) and the number of terms (W)
  const N = TF.length;
  const W = TF[0].length;
  // Initialize an array to store IDF values
  const IDF = new Array(W);

  // Iterate over each term
  for (let i = 0; i < W; i++) {
    let cnt = 0;
    // Count the number of documents containing the term
    for (let j = 0; j < N; j++) {
      if (TF[j][i]) cnt++;
    }
    // Calculate IDF value for the term
    if (cnt) IDF[i] = Math.log((N - cnt + 0.5) / (cnt + 0.5) + 1) + 1;
  }

  // Log message indicating the completion of IDF calculation
  console.log("IDF Calculation done!");
  // Return the IDF array
  return IDF;
}

// Export the function for use in other modules
module.exports = {
  calculateIDF,
};

// IDF.forEach((word) => {
//   fs.appendFileSync("IDF.txt", word + "\n");
// });
