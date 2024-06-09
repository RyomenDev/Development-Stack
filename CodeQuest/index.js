const express = require("express");
const {setupMiddlewares} = require("./middlewares/index");

// Create an instance of the express application
const app = express();

setupMiddlewares(app);  

// Set the port for the server to listen on
const port = process.env.PORT || 3000;

try {
  // Start the server and listen on the specified port
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
} catch (error) {
  console.error("Error starting server:", error);
}

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
