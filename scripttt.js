const fs = require("fs");

// Function to parse the Markdown and convert to JSON
function parseMarkdownToJSON(mdContent) {
  const lines = mdContent.split("\n");
  const result = {};
  let currentCategory = null;
  let currentSubcategory = null;

  lines.forEach((line) => {
    line = line.trim();

    // Detect category header
    if (line.startsWith("## ")) {
      const categoryName = line.substring(3).trim();
      result[categoryName] = { subcategories: {} };
      currentCategory = categoryName;
    }

    // Detect subcategory header
    else if (line.startsWith("#### ") && currentCategory) {
      const subcategoryName = line.substring(5).trim();
      result[currentCategory].subcategories[subcategoryName] = [];
      currentSubcategory = subcategoryName;
    }

    // Detect list item (tool entry)
    else if (line.startsWith("* ") && currentSubcategory) {
      const match = line.match(/\* \[(.+?)\]\((.+?)\) - (.+)/);
      if (match) {
        const name = match[1].trim();
        const url = match[2].trim();
        const description = match[3].trim();

        result[currentCategory].subcategories[currentSubcategory].push({
          name,
          description,
          url,
        });
      }
    }
  });

  return result;
}

// Read Markdown file and convert to JSON
function convertMarkdownFileToJSON(inputFilePath, outputFilePath) {
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const jsonResult = parseMarkdownToJSON(data);

    fs.writeFile(
      outputFilePath,
      JSON.stringify(jsonResult, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("JSON file successfully created at:", outputFilePath);
        }
      }
    );
  });
}

// Example usage
const inputMarkdownPath = "ai.md";
const outputJsonPath = "output.json";
convertMarkdownFileToJSON(inputMarkdownPath, outputJsonPath);
