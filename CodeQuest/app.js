const express = require("express");
const path = require("path");
const routes = require("./routes");

// Create an instance of the express application
const app = express(); 

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Set the static assets directory (for serving CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Use the routes defined in the routes module
app.use("/", routes); 

// Set the port for the server to listen on
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// Binary Search Tree -> ['binary', 'search', 'tree', 'orange'] -> ['binary', 'search', 'tree']
// Keywords -> []
// const score = [];
// for(const document of documents) {
// bm25
// score.push({id: document_id, score: bm25})
// }

// O(N*W)
// score.sort((a, b) => {
//  return b.score-a.score;
// })

// for(let i=0; i< 10; i++){
// console.log(document[score[i]._id]);
//}
//
//
