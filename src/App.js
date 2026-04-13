import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import './App.css';

// Paste your TMDB API key here
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies]       = useState([]);   // list of movies to show
  const [loading, setLoading]     = useState(false); // show loader while fetching
  const [error, setError]         = useState('');    // error message if fetch fails
  const [heading, setHeading]     = useState('Popular Movies');
  const [activeTab, setActiveTab] = useState('popular');

  // Runs once when the app first loads — fetch popular movies
  useEffect(() => {
    fetchByCategory('popular');
  }, []);

  // Fetch movies by category (popular, top_rated, upcoming)
  async function fetchByCategory(category) {
    setActiveTab(category);
    setHeading(category === 'popular' ? 'Popular Movies'
             : category === 'top_rated' ? 'Top Rated'
             : 'Upcoming');
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to load movies. Check your API key.');
    } finally {
      setLoading(false); // always hide loader whether success or fail
    }
  }

  // Fetch movies by search query
  async function handleSearch(query) {
    setActiveTab('');
    setHeading(`Results for "${query}"`);
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.results.length === 0) {
        setError('No movies found. Try a different search.');
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const tabs = ['popular', 'top_rated', 'upcoming'];

  return (
    <div className="app">
      <h1 className="app-title">MovieSearch</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Category tabs */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => fetchByCategory(tab)}
            style={{
              padding:'6px 16px', borderRadius:'20px', border:'1px solid',
              borderColor: activeTab === tab ? '#e50914' : '#333',
              background: activeTab === tab ? '#e50914' : 'transparent',
              color:'#fff', fontSize:'13px', cursor:'pointer'
            }}>
            {tab === 'popular' ? 'Popular' : tab === 'top_rated' ? 'Top Rated' : 'Upcoming'}
          </button>
        ))}
      </div>

      <h2 style={{ fontSize:'18px', fontWeight:'500', marginBottom:'20px' }}>{heading}</h2>

      {loading && <Loader />}
      {error   && <p style={{ color:'#ff5252', fontSize:'14px' }}>{error}</p>}

      {/* Movie grid */}
      {!loading && !error && (
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))',
          gap:'16px'
        }}>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;