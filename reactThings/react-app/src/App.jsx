import Movies from "./Movies.jsx";
import List from "./List.jsx"

function App() {
  let data = [
    {
      title: "Salaar",
      year: 2023,
      genres: ["Thriller", "Fights"],
      summary: "Directed By Prashant Neel",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZDExMmNmMTgtNWU3MS00YzFkLWIwMjMtZmJlMmE3YTI0ZDBmXkEyXkFqcGc@._V1_.jpg",
    },
    {
      title: "Pushpa 2: The Rule",
      year: 2024,
      genres: ["Action", "Drama"],
      summary: "Directed By Sukumar",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNWU1ZWFhNGQtZDhlZC00ZWFlLTlmNmEtN2VmYmZiN2Y5ZmQ2XkEyXkFqcGc@._V1_.jpg",
    },
    {
      title: "RRR",
      year: 2023,
      genres: ["Action", "Drama"],
      summary: "Directed By Rajamouli",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNWMwODYyMjQtMTczMi00NTQ1LWFkYjItMGJhMWRkY2E3NDAyXkEyXkFqcGc@._V1_.jpg",
    },
  ];

  let items = [{name: "Python", Ext: ".py"}, {name: "JavaScript", Ext: ".js"}, {name: "TypeScript", Ext: ".ts"}];

  return (
    <>
      <div className="flexBox">
        {data.map((movie) => (
          <div key={movie.title}>
            <Movies
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
              summary={movie.summary}
              poster={movie.poster}
            />
          </div>
        ))}
      </div>
      <List items={items} heading="Programing Languages"/>
    </>
  );
}

export default App;
