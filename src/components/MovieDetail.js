import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default class MovieDetail extends Component {
  state = {
    movie: {}
  }

  componentDidMount = async () => {
    await axios({
      method: 'get',
      url: `http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=12a14590`,
    })
      .then((response) => {
        this.setState({ movie: { ...response.data } })
        console.log(response.data)
      });
  }

  render() {
    const { movie } = this.state;
    return (
      <div className="container mt-8">
        <Link to='/'>
          <div className="back">

          <FaArrowLeft />
          </div>
        </Link>
        <div className="movie-detail-container">
          <div className="p-4  width-500">
            <p><span>{movie.Runtime}</span> <span>{movie.Year}</span> <span className="rated">{movie.Rated}</span></p>
            <p className="title">{movie.Title}</p>
            <div className="flex mb-4">
              <span>{movie.imdbRating}</span>
              <span>{movie.Metascore}</span>
            </div>

            <div className="mb-4">
              <p className="sub-title">Plot</p>
              <p>{movie.Plot}</p>
            </div>

            <div className="flex">
              <div>
                <p className="sub-title">Cast</p>
                <p>{movie.Actors}</p>
              </div>
              <div>
                <p className="sub-title">Genre</p>
                <p>{movie.Genre}</p>
              </div>
              <div>
                <p className="sub-title">Director</p>
                <p>{movie.Director}</p>
              </div>
            </div>

          </div>
          <img src={movie.Poster} className="img-detail img-responsive" alt="" />
        </div>
      </div>
    )
  }
}