let diagram = document.getElementById('diagram');

function generateDiagram(prompt) {
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

  fetch(url, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
  })
    .then(response => {
      if (response.headers.get('content-type')?.includes('application/json')) {
        return response.json(); 
      }
      return response.text(); 
    })
    .then(data => {
      // Handle the response data
      // console.log('Response Data:', data);
      diagram.innerHTML = data

    })
    .catch(error => {
      // Handle errors if any
      console.error('Error:', error);
    });
}

// Example usage of the function with a random prompt
generateDiagram("Generate a UML diagram for an e-commerce system");
