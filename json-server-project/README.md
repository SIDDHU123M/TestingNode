# JSON Server Project

This project sets up a JSON server using npm, allowing you to serve a collection of movie data.

## Project Structure

```
json-server-project
├── .devcontainer
│   └── devcontainer.json
├── src
│   └── movies.json
├── package.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd json-server-project
   ```

2. **Open in a development container**:
   Use the provided `.devcontainer` configuration to open the project in a development container.

3. **Install dependencies**:
   Run the following command to install the necessary packages:
   ```
   npm install
   ```

4. **Start the JSON server**:
   Use the following command to start the JSON server:
   ```
   npm run start
   ```

   This will serve the movie data from `src/movies.json` at `http://localhost:3000/movies`.

## Movie Data

The movie data is stored in `src/movies.json` and includes the following fields for each movie:

- **title**: The title of the movie.
- **year**: The release year of the movie.
- **genres**: An array of genres associated with the movie.
- **summary**: A brief summary of the movie.
- **poster**: A URL to the movie's poster image.

## License

This project is licensed under the MIT License.