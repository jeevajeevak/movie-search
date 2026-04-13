import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies..."
        style={{
          flex: 1, padding: '10px 14px',
          borderRadius: '8px', border: '1px solid #333',
          background: '#1a1a1a', color: '#fff', fontSize: '14px'
        }}
      />
      <button type="submit" style={{
        padding: '10px 20px', borderRadius: '8px',
        background: '#e50914', color: '#fff',
        border: 'none', fontSize: '14px', cursor: 'pointer', fontWeight: '500'
      }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;