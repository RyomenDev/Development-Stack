const stringSimilarity = require("string-similarity");

/**
 * BM25 Algorithm
 * Calculates the similarity score of each document with the query string using the BM25 algorithm.
 * Sorts the documents according to the score and returns the top 10 results.
 *
 * param {number} N - The total number of documents.
 * param {string} query - The query string.
 * param {number[]} qid - An array of query keyword indices.
 * param {number[]} IDF - An array of inverse document frequency values for each keyword.
 * param {number[]} length - An array of document lengths.
 * param {object[]} TF - An array of term frequency objects for each document.
 * param {string[]} titles - An array of document titles.
 * param {number} avgdl - The average document length.
 * returns {object[]} - An array of objects containing document IDs and similarity scores.
 */
function BM25algorithm(N, query, qid, IDF, length, TF, titles, avgdl) {
  // Initialize an array to store similarity scores of each document with the query
  const arr = [];

  for (let i = 0; i < N; i++) {
    let s = 0;
    // Calculate BM25 score for each document
    qid.forEach((key) => {
      const idfKey = IDF[key];
      let tf = 0;
      for (let k = 0; k < TF[i].length; k++) {
        if (TF[i][k].id == key) {
          tf = TF[i][k].val / length[i];
          break;
        }
      }
      const tfkey = tf;
      const x = tfkey * (1.2 + 1);
      const y = tfkey + 1.2 * (1 - 0.75 + 0.75 * (length[i] / avgdl));
      let BM25 = (x / y) * idfKey;

      // Giving Higher weightage to Leetcode and Interview bit Problems
      if (i < 2214) BM25 *= 2;
      s += BM25;
    });
    // Calculate title similarity and incorporate it into the score
    const titSim = stringSimilarity.compareTwoStrings(
      titles[i],
      query.toLowerCase()
    );
    s *= titSim;

    // Push document ID and similarity score to the array
    arr.push({ id: i, sim: s });
  }

  // Sorting documents according to their similarity scores
  arr.sort((a, b) => b.sim - a.sim);
  return arr;
}

module.exports = {
  BM25algorithm,
};
