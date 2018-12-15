import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    return (
      <Link to={`/movie/${this.props.movie.imdbID}`}>
        <div className="movie-card" key={this.props.movie.imdbID}>
          <img className="movie-img" src={this.props.movie.Poster === 'N/A' ? 'https://via.placeholder.com/75x100' : this.props.movie.Poster} alt={`movie poster of ${this.props.movie.Title}`} />
          <h2 className="title">{}</h2>
        </div>
      </Link>
    );
  }
}

export default Movie;
