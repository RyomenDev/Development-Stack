const path = require("path");
const { readDocument } = require("../utils/fileUtils");
const { processDocument } = require("../utils/textUtils");

/**
 * Calculates the length of each document by processing their contents.
 * param {number} N - The total number of documents.
 * returns {string[][]} - An array containing processed words for each document.
 */
function calculateLength(N) {
  // Initialize an array to store documents
  const documents = [];

  // Loop through each document and read its contents
  for (let i = 1; i <= N; i++) {
    // Construct the file path for the current document
    const filePath = path.join(
      __dirname,
      "..",
      "Problems",
      `problem_text_${i}.txt`
    );
    // Read the document contents
    const question = readDocument(filePath);
    // Add the document contents to the array
    documents.push(question);
  }

  // Process each document to extract relevant words
  let docKeywords = documents.map((doc) => processDocument(doc));

  // Log message indicating the completion of document processing
  console.log("Document Keywords Generated");

  // Return the processed words for each document
  return docKeywords;
}

// Export the function for use in other modules
module.exports = {
  calculateLength,
};

// function calculateLength(N) {
//   const documents = [];

//   for (let i = 1; i <= N; i++) {
//     const filePath = path.join(
//       __dirname,
//       "..",
//       "Problems",
//       `problem_text_${i}.txt`
//     );
//     // const question = fs.readFileSync(str1).toString();
//     const question = readDocument(filePath);
//     //   console.log(question);
//     documents.push(question);
//   }

//   let docKeywords = [];
//   for (let i = 0; i < documents.length; i++) {
//     const lines = documents[i].split("\n");
//     // console.log(lines);
//     const docWords = [];
//     for (let k = 0; k < lines.length; k++) {
//       const temp1 = lines[k].split(" ");

//       temp1.forEach((e) => {
//         e = e.split("\r");
//         if (e[0].length) docWords.push(e[0]);
//       });
//     }
//     // const oldString = documents[i].split(" ");
//     const newString = removeStopwords(docWords);
//     newString.sort();
//     let temp = [];
//     for (let j = 0; j < newString.length; j++) {
//       newString[j] = newString[j].toLowerCase();
//       newString[j] = removePunc(newString[j]);
//       if (newString[j] !== "") temp.push(newString[j]);
//     }

//     docKeywords.push(temp);
//   }
//   console.log("docKeywords Calculated");
//   return docKeywords;
// }

//

// let sum = 0;
// for (let i = 0; i < N; i++) {
//   const length = docKeywords[i].length;
//   sum += length;
//   //   fs.appendFileSync("length.txt", length + "\n");
//   appendToFile("length.txt", length);
//   //   console.log(length);
// }
