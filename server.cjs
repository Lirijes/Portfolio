const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_BASE_URL;

app.use('/api', (req, res) => {
  const url = `${apiUrl}${req.originalUrl.replace('/api', '')}`;
  const client = url.startsWith('https') ? https : http;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'ApiKey': apiKey
    }
  };

  client.get(url, options, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } catch (e) {
        res.status(500).json({ message: 'Error parsing response from API' });
      }
    });

  }).on("error", (err) => {
    res.status(500).json({ message: err.message });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
