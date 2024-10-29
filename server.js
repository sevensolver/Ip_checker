const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;
const host = '0.0.0.0';

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Ensure the videos directory exists
const videosDir = path.join(__dirname, 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

// Endpoint to upload file
app.post('/upload', upload.single('videoFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
  res.send(`File uploaded successfully. Access it at: ${fileUrl}`);
});

// Serve the videos folder as static files
app.use('/videos', express.static(videosDir));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! The server is running.');
});

const server = app.listen(port, host, () => {
  console.log(`Server is running from: ${__dirname}`);
});

server.timeout = 10 * 60 * 1000; // 10 minutes timeout
