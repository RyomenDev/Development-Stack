/**
 * This function takes query keywords and the main keywords array,
 * and returns an array of indices representing the positions
 * of the query keywords in the main keywords array.
 *
 * param {string[]} queryKeywords - An array of processed query keywords.
 * param {string[]} keywords - An array of all keywords in the dataset.
 * returns {number[]} - An array of indices of the query keywords in the main keywords array.
 */
const indexing = (queryKeywords, keywords) => {
  let qid = [];
  queryKeywords.forEach((key) => {
    qid.push(keywords.indexOf(key)); // Push the index of each query keyword in the keywords array
  });
  return qid;
};

module.exports = {
  indexing,
};
