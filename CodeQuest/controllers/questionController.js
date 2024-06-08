// Importing necessary modules
const { readDocument } = require("../utils/fileUtils");
const path = require("path");
const { titles, urls } = require("../utils/data");

// Utility function to capitalize the first letter of each word
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

// Function to render the question page
function renderQuestion(req, res) {
  // Extracting the id parameter from the request URL
  const id = Number(req.params.id);

  // Constructing the file path for the corresponding problem text file
  const filePath = path.join(
    __dirname,
    "..",
    "Problems",
    `problem_text_${id + 1}.txt`
  );

  try {
    // Reading the content of the problem text file
    let text = readDocument(filePath);

    // If the problem is before ID 1774, remove unnecessary text
    if (id <= 1773) {
      text = text.split("ListShare")[1];
    }

    // Replacing newline characters with HTML line breaks for formatting
    text = text.replace(/\n/g, "<br/>");

    // Extracting the title of the question and capitalizing it
    let title = titles[id];
    title = title.split("-").join(" ").capitalize();

    // Determining the type of question based on its ID
    let type = "";
    if (id < 1774) type = "Leetcode";
    else if (id < 2214) type = "Interview Bit";
    else type = "Techdelight";

    // Constructing the question object to be passed to the view template
    const questionObject = {
      title,
      link: urls[id],
      value: text,
      type,
    };

    // Rendering the "question" view template with the questionObject data
    res.render("question", { questionObject });
  } catch (err) {
    // Handling errors if the file cannot be found or read
    if (err.code === "ENOENT") {
      res.status(404).send({ error: `File not found: ${filePath}` });
    } else {
      res.status(500).send({ error: `Error reading file: ${err.message}` });
    }
  }
}

// Exporting the renderQuestion function to be used in other modules
module.exports = { renderQuestion };


