const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Port number can be changed as per your requirement

app.use(cors());

// Serve static files from the 'dist' directory
app.use(
  express.static(path.join(__dirname, "dist", "assets", "index-D3F-4Q0D.js"))
);

// Serve index.html for any other routes to allow client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "assets", "index-D3F-4Q0D.js"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
