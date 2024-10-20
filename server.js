const express = require('express');
const app = express();

console.log(__dirname);  // This will log your current directory path

app.get('/', (req, res) => {
  res.send(`Hello World! The server is running from: ${__dirname}`);
});

const port = 3001;
const host = '0.0.0.0';  // Bind to all network interfaces

app.listen(port, host, () => {
  console.log(`Server is running from: ${__dirname}`);
});
