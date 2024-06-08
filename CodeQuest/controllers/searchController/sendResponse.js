/**
 * Sends the response as JSON after a delay, providing time for other operations to complete.
 * If 'nonZero' is truthy, it sends the 'response' object; otherwise, it sends an empty array.
 *
 * param {boolean} nonZero - Indicates if there are non-zero search results.
 * param {Array} response - The response object to send.
 * param {Object} res - The response object to send the JSON response.
 */
const sendResponse = (nonZero, response, res) => {
  // Delay the response to allow other operations to complete
  setTimeout(() => {
    // Send the response as JSON
    if (nonZero) {
      res.json(response);
    } else {
      res.json([]);
    }
  }, 1000); // Delay time in milliseconds
};

module.exports = {
  sendResponse,
};
