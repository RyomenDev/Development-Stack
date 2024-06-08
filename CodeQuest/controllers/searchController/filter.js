/**
 * This function filters out duplicate keywords from the queryKeywords array.
 *
 * param {string[]} queryKeywords - An array of processed query keywords.
 * returns {string[]} - An array of unique query keywords.
 */
const filter = (queryKeywords) => {
  let temp1 = [];
  queryKeywords.forEach((key) => {
    if (temp1.indexOf(key) == -1) {
      temp1.push(key); // Add the keyword to temp1 if it is not already present
    }
  });
  return temp1; // Return the array of unique keywords
};

module.exports = {
  filter,
};
