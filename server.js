const express = require('express');
const app = express();
const path = require('path');
const os = require('os');

// Get the current directory
const currentPath = __dirname;

app.get('/', (req, res) => {
  res.send(`Hello World! This server is running from the directory: ${currentPath}`);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://${os.hostname()}:${port}`);
});
