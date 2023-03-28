// 4324b953  omdb api
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=joker&apikey=4324b953";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      })
  }, [])

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4324b953`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  }

  return (
    <div className="App">
      <Header text='MOVIES' />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>

      <div className='movies'>
        {
          loading && !errorMessage ? (
            <span>Loading...</span>
          ) : errorMessage ? (
            <div className='errorMessage'>{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie?.Title}`} movie={movie} />
            ))
          )
        }
      </div>
    </div>
  );
}

export default App;
