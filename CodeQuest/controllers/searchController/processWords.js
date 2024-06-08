const removePunc = require("remove-punctuation");
const { removeStopwords } = require("stopword");
const { wordsToNumbers } = require("words-to-numbers");

/**
 * Processes the query string to extract and transform words, removing punctuation, stopwords,
 * converting words to numbers, and handling camelCased words.
 *
 * param {string} query - The query string to be processed.
 * param {string[]} queryKeywords - The array to store the processed query keywords.
 */
function processWords(query, queryKeywords) {
  // Splitting the query string into an array of words
  const oldString = query.split(" ");

  // Removing stopwords from the query
  const newString = removeStopwords(oldString);
  newString.sort(); // Sorting the processed string alphabetically

  // Processing each word in the query string
  for (let j = 0; j < newString.length; j++) {
    newString[j] = newString[j].toLowerCase(); // Converting to lowercase
    newString[j] = removePunc(newString[j]); // Removing punctuation
    if (newString[j] !== "") queryKeywords.push(newString[j]); // Adding processed words to queryKeywords

    // Extracting camelCased words and adding them to queryKeywords
    var letr = newString[j].match(/[a-zA-Z]+/g);
    if (letr) {
      letr.forEach((w) => {
        queryKeywords.push(removePunc(w.toLowerCase())); // Removing punctuation and converting to lowercase
      });
    }

    // Converting words to numbers and adding them to queryKeywords
    let x = wordsToNumbers(newString[j]).toString();
    if (x != newString[j]) queryKeywords.push(x);
  }
}

module.exports = {
  processWords,
};
