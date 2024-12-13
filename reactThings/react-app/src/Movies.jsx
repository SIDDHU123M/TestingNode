import PropTypes from 'prop-types';


function Movies(props) {
      return (
        <div className="SidebySide">
          <img src={props.poster} />
          <div className='UpandDown'>
            <h3>{props.title}</h3>
            <p>Year: {props.year}</p>
            <p>Genres: {props.genres}</p>
            <p>Summery: {props.summary}</p>
          </div>
        </div>
      ); 
}

Movies.propTypes = {
      title: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      summary: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired
};
Movies.defaultProps = {
      title: "Unknown",
      year: 2021,
      genres: ["Unknown"],
      summary: "Unknown",
      poster: "https://m.media-amazon.com/images/M/MV5BZDExMmNmMTgtNWU3MS00YzFkLWIwMjMtZmJlMmE3YTI0ZDBmXkEyXkFqcGc@._V1_.jpg"
};

export default Movies