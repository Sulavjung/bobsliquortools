const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Handle requests and return the built React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
const port = 3007; // Choose any available port number
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

//http://98.234.226.160:6000/
