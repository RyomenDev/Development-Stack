/**
 * Generates an array of unique keywords from the document keywords.
 * param {number} N - Total number of documents.
 * param {string[][]} docKeywords - Array containing keywords for each document.
 * returns {Object} - Object containing the generated keywords array.
 */
function generateKeywords(N, docKeywords) {
  // Initialize an empty array to store unique keywords
  let keywords = [];

  // Iterate through each document's keywords to generate the unique keywords array
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < docKeywords[i].length; j++) {
      // Check if the keyword already exists in the keywords array
      if (keywords.indexOf(docKeywords[i][j]) === -1) {
        // If not found, add the keyword to the keywords array
        keywords.push(docKeywords[i][j]);
      }
    }
  }

  // Sort the keywords array alphabetically
  keywords.sort();

  // Log message indicating the completion of keywords generation
  console.log("Keywords generated");

  // Return an object containing the generated keywords array
  return { keywords };
}

// Export the generateKeywords function for use in other modules
module.exports = {
  generateKeywords,
};
