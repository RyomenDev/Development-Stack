const lemmatizer = require("wink-lemmatizer");
const natural = require("natural");

/**
 * Lemmatizes and spell-checks query keywords.
 *
 * param {string[]} queryKeywords - The array of query keywords.
 * param {string[]} keywords - The array of keywords for spell checking.
 * returns {string[]} - The updated array of query keywords after lemmatization and spell-checking.
 */
function Lemmatizer(queryKeywords, keywords) {
  let queryKeywordsNew = queryKeywords;

  queryKeywords.forEach((key) => {
    let key1 = key;
    let key2 = lemmatizer.verb(key1); // Lemmatizing verbs
    queryKeywordsNew.push(key2);

    // Spell checking keywords and adding corrections to queryKeywordsNew
    let spellcheck = new natural.Spellcheck(keywords);
    let spellkey1 = spellcheck.getCorrections(key1);
    let spellkey2 = spellcheck.getCorrections(key2);

    // Adding spell-check corrections to queryKeywordsNew
    if (spellkey1.indexOf(key1) == -1) {
      spellkey1.forEach((k1) => {
        queryKeywordsNew.push(k1);
        queryKeywordsNew.push(lemmatizer.verb(k1)); // Lemmatizing corrected words
      });
    }

    if (spellkey2.indexOf(key2) == -1) {
      spellkey2.forEach((k2) => {
        queryKeywordsNew.push(k2);
        queryKeywordsNew.push(lemmatizer.verb(k2)); // Lemmatizing corrected words
      });
    }
  });

  // Updating the queryKeywords array
  queryKeywords = queryKeywordsNew;
  queryKeywords.sort(); // Sorting queryKeywords alphabetically

  return queryKeywords; // Return the updated queryKeywords array
}

module.exports = {
  Lemmatizer,
};
