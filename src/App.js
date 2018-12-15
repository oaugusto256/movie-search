import React, { Component } from 'react';
import logo from './images/logo.png';
import search from './images/search.png';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { DebounceInput } from 'react-debounce-input';
import Movie from './components/Movie';
import { BarLoader } from 'react-spinners';

class App extends Component {
  state = {
    search_value: '',
    movies: [],
    loading: false
  }

  searchMovie = async (name) => {
    this.setState({
      loading: true
    })
    await axios({
      method: 'get',
      url: `http://www.omdbapi.com/?s=${name}&apikey=12a14590`,
    })
    .then((response) => {
      if(response.data.Error === "Movie not found!") {
        this.setState({
          movies: [],
          loading: false
        })
      } else {
        this.setState({
          movies: response.data.Search,
          loading: false
        })
      }
    });
  }

  handleInputChange = async (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    await this.setState({
      search_value: value
    })

    if(value.length === 0) {
      this.setState({
        movies: []
      })
    } else {
      this.searchMovie(this.state.search_value);
    }
  }

  renderMovies = () => {
    console.log(this.state.movies)
    if(this.state.movies.length > 0) {
      return this.state.movies.map(movie => {
        return (
          <Movie movie={movie} />
        )
      })
    } else {
      return (
        <div className="empty-movies">
          <img src={search} alt=""/>
          <h1>Don't know what to search?</h1>
          <p>Here's an offer you can't refuse.</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="logo">
          <img src={logo} alt=""/>
        </div>
        <div className="input-container">
          <div className="input-icon">
            <FaSearch color={'#9DABB5'} />
          </div>
          <DebounceInput
            minLength={3}
            debounceTimeout={1000}
            value={this.state.search_value}
            onChange={this.handleInputChange}
            className="input-search"
            placeholder="Search movies..."
          />
        </div>
        <div className="movies-container">
          {this.state.loading ?
            <div className="loading">
              <BarLoader
                color={'#FFF'}
                height={10}
                width={150}
              />
            </div>
            : this.renderMovies()}
        </div>
      </div>
    );
  }
}

export default App;