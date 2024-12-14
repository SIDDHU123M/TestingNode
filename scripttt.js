const fs = require("fs");

fs.readFile("output.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const jsonData = JSON.parse(data);

  function convertData(data) {
    const result = {};

    Object.keys(data).forEach((category) => {
      result[category] = {};

      Object.keys(data[category].subcategories).forEach((subcategory) => {
        result[category][subcategory] =
          data[category].subcategories[subcategory];
      });
    });

    return result;
  }

  const convertedData = convertData(jsonData);

  fs.writeFile(
    "converted_output.json",
    JSON.stringify(convertedData, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Converted data written to converted_output.json");
    }
  );
});
