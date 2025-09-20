const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/transcribe', async (req, res) => {
  const { audio, sourceLang, targetLang } = req.body;
  
  // Call Spitch API with YOUR key from .env
  const response = await fetch('https://api.spitch.ai/v1/transcribe', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SPITCH_API_KEY}`,
      'Content-Type': 'audio/wav',
      'Source-Language': sourceLang,
      'Target-Language': targetLang
    },
    body: audio
  });
  
  const data = await response.json();
  res.json(data);
});

app.listen(3001, () => console.log('Server running on port 3001'));