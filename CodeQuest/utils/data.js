// Import required data arrays from corresponding routes
const IDF = require("../routes/idf"); // Array containing IDF values
const keywords = require("../routes/keywords"); // Array containing keywords
const length = require("../routes/length"); // Array containing document lengths
let TF = require("../routes/TF"); // Array containing TF values
const titles = require("../routes/titles"); // Array containing titles
const urls = require("../routes/urls"); // Array containing URLs

// Constants defining the dataset size and other relevant parameters
const N = 3023; // Number of documents
const W = 27602; // Number of unique keywords
const avgdl = 138.27125372146875; // Average document length

// Exporting all the required data and constants
module.exports = { IDF, keywords, length, TF, titles, urls, N, W, avgdl };
