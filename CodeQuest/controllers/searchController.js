// Importing necessary modules
const { extractNumber } = require("./searchController/getNumbers");
const { processWords } = require("./searchController/processWords");
const { Lemmatizer } = require("./searchController/Lemmatizer");
const { filter } = require("./searchController/filter");
const { indexing } = require("./searchController/indexing");
const { BM25algorithm } = require("./searchController/BM25algorithm");
const { top10docs } = require("./searchController/top10docs");
const { sendResponse } = require("./searchController/sendResponse");

const {
  IDF,
  keywords,
  length,
  TF,
  titles,
  urls,
  N,
  avgdl,
} = require("../utils/data");

/**
 * Handles the search request by processing the query string, performing keyword extraction, Lemmatization, and BM25 algorithm.
 * Returns the top 10 search results as JSON response.
 *
 * param {Object} req - The request object.
 * param {Object} res - The response object.
 */

function performSearch(req, res) {
  // Extracting the query string from the request parameters
  const query = req.query.query;

  // Extracting numbers from the query string
  let queryKeywords = extractNumber(query);
  //   console.log("Step 1 Extracting numbers done", queryKeywords);

  // ! Processing each word in the query string
  processWords(query, queryKeywords);
  //   console.log("Step 2 Processing word done", queryKeywords);

  // ! Lemmatizing queryKeywords and performing spell check - Grammar and Spell Check
  Lemmatizer(queryKeywords, keywords);
  //   console.log("Step 3 Lemmatizing  done", queryKeywords);

  // ! filter out those keywords which are present in our dataset
  filter(queryKeywords);
  //   console.log("Step 4 filter done", queryKeywords);

  // ! Getting the index of each query keyword in the keywords array
  let qid = indexing(queryKeywords, keywords);
  //   console.log("Step 5 indexing done", qid);

  // ! BM25 Algorithm
  const arr = BM25algorithm(N, query, qid, IDF, length, TF, titles, avgdl);
  //   console.log("step 6 BM25 Algorithm");

  // ! Retrieving top 10 documents
  const { response, nonZero } = top10docs(arr, titles);
  //   console.log("step 7 response received ", response);

  // ! Send the response as JSON
  sendResponse(nonZero, response, res);
  //   console.log("step 8 response send");
}

module.exports = { performSearch };
