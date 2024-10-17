document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');

  generateButton.addEventListener('click', () => {
    const prompt = promptInput.value || "Generate a simple flowchart for a login system";

    fetch('http://127.0.0.1:3000/generate-diagram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const diagramContainer = document.getElementById('diagram');
        diagramContainer.classList.add('mermaid');
        diagramContainer.innerHTML = data.generatedResponse;
        window.mermaid.init(undefined, diagramContainer);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});