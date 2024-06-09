const path = require("path");
const { readDocument } = require("../../utils/fileUtils");

/**
 * Retrieves information for the top 10 documents based on their similarity scores and constructs the response.
 *
 * param {Object[]} arr - Array containing objects with document IDs and their similarity scores.
 * param {string[]} titles - Array containing titles of documents.
 * returns {Object} An object containing the response array and the count of non-zero similarity scores.
 */
function top10docs(arr, titles) {
  let response = [];
  let nonZero = 0;

  // Retrieve information for the top 10 documents and construct the response
  for (let i = 0; i < 10; i++) {
    if (arr[i].sim != 0) nonZero++;

    // Constructing the file path for the document
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "Problems",
      `problem_text_${arr[i].id + 1}.txt`
    );

    try {
      // Reading the document content from the file
      let question = readDocument(filePath).split("\n");
      let n = question.length;
      let problem = "";

      // Handling different formats of document content
      if (arr[i].id <= 1773) {
        problem = question[0].split("ListShare")[1] + " ";
        if (n > 1) problem += question[1];
      } else {
        problem = question[0] + " ";
        if (n > 1) problem += question[1];
      }

      // Constructing the response object and pushing it to the response array
      response.push({
        id: arr[i].id,
        title: titles[arr[i].id],
        problem: problem,
      });
    } catch (err) {
      // Handling file not found error
      if (err.code === "ENOENT") {
        console.error(`File not found: ${filePath}`);
        response.push({
          id: arr[i].id,
          title: titles[arr[i].id],
          problem: "Problem description not available",
        });
      } else {
        console.error(`Error reading file: ${err}`);
        throw err;
      }
    }
  }

  // Returning the response array and the count of non-zero similarity scores
  return { response, nonZero };
} 

module.exports = {
  top10docs,
};
