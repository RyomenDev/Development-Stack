/**
 * Calculates the Term Frequency (TF) for each document in relation to a set of keywords.
 * param {string[][]} docKeywords - Array of arrays containing keywords for each document.
 * param {string[]} keywords - Array containing all unique keywords across documents.
 * returns {number[][]} - TF matrix representing the TF values for each document and keyword.
 */
function calculateTF(docKeywords, keywords) {
  // Get the total number of documents (N) and total number of unique keywords (W)
  const N = docKeywords.length;
  const W = keywords.length;

  // Initialize an empty TF matrix to store TF values for each document and keyword
  const TF = docKeywords.map((doc) => {
    // Calculate the total number of words in the current document
    const wordCount = doc.length;
    // Initialize an array to store TF values for each keyword in the document
    const tf = new Array(W).fill(0);
    // Iterate through each word in the document
    doc.forEach((word) => {
      // Find the index of the word in the keywords array
      const index = keywords.indexOf(word);
      // If the word is found in the keywords array, increment the corresponding TF value
      if (index !== -1) tf[index]++;
    });
    // Calculate the TF value for each keyword by dividing the count by the total word count
    return tf.map((count) => count / wordCount);
  });

  // Log message indicating the completion of TF calculation
  console.log("TF calculation completed");

  // Return the TF matrix
  return TF;
}

// Export the calculateTF function for use in other modules
module.exports = {
  calculateTF,
};

//

// function calculateTF(docKeywords, keywords) {
//   const N = docKeywords.length;
//   const W = keywords.length;

//   let TF = new Array(N);
//   for (let i = 0; i < N; i++) {
//     TF[i] = new Array(W).fill(0);
//     let map = new Map();
//     docKeywords[i].forEach((key) => {
//       return map.set(key, 0);
//     });

//     docKeywords[i].forEach((key) => {
//       let cnt = map.get(key);
//       cnt++;
//       return map.set(key, cnt);
//     });

//     docKeywords[i].forEach((key) => {
//       const id = keywords.indexOf(key);
//       if (id !== -1) {
//         TF[i][id] = map.get(key) / docKeywords[i].length;
//       }
//     });
//   }

//   console.log("TF Call done!");
//   return TF;
// }

//

// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < W; j++) {
//     if (TF[i][j] != 0)
//       fs.appendFileSync("TF.txt", i + " " + j + " " + TF[i][j] + "\n");
//   }
// }
