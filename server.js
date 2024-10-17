const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const fetchWithRetry = async (url, options, retries = 3, backoff = 3000) => {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(url, options);

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        console.log(`Rate limit exceeded. Retrying in ${backoff / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

app.post('/generate-diagram', async (req, res) => {
  const prompt = req.body.prompt;
  const url = 'https://oss-ai.excalidraw.com/v1/ai/text-to-diagram/generate';

  const requestHeaders = {
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://excalidraw.com',
    'referer': 'https://excalidraw.com/',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const requestBody = {
    prompt: prompt || "Generate a simple flowchart for a login system",
  };

  try {
    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    const data = response.headers.get('content-type')?.includes('application/json')
      ? await response.json()
      : await response.text();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});