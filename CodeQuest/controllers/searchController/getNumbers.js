const converter = require("number-to-words");

/**
 * Extracts numbers from the query string and adds their word forms to the queryKeywords array.
 *
 * param {string} query - The query string.
 * returns {string[]} - An array of query keywords including numbers and their word forms.
 */
function extractNumber(query) {
  let queryKeywords = [];

  // Extracting numbers from the query string
  let getNum = query.match(/\d+/g);

  // Pushing numbers and their word forms to the queryKeywords array
  if (getNum) {
    getNum.forEach((num) => {
      queryKeywords.push(num);
      let numStr = converter.toWords(Number(num)); // Convert number to words
      let numKeys = numStr.split("-"); // Split compound words

      queryKeywords.push(numStr); // Adding word form of numbers

      // Splitting compound words and adding individual words to queryKeywords
      numKeys.forEach((key) => {
        let spaceSplits = key.split(" ");
        if (numKeys.length > 1) queryKeywords.push(key); // Add the full key
        if (spaceSplits.length > 1) {
          spaceSplits.forEach((word) => {
            queryKeywords.push(word); // Add individual words from compound words
          });
        }
      });
    });
  }
  return queryKeywords;
}

module.exports = {
  extractNumber,
};
