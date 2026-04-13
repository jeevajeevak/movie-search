import React from 'react';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const { title, poster_path, vote_average, release_date, overview } = movie;
  const year = release_date ? release_date.slice(0, 4) : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const poster = poster_path
    ? `${IMG_BASE}${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div style={{
      background: '#1a1a1a', borderRadius: '10px',
      overflow: 'hidden', border: '1px solid #2a2a2a',
      transition: 'transform 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img src={poster} alt={title}
        style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
      <div style={{ padding: '12px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
          <span style={{ fontSize:'12px', color:'#888' }}>{year}</span>
          <span style={{
            fontSize:'12px', fontWeight:'500',
            background: rating >= 7 ? '#1a3a1a' : '#2a1a1a',
            color: rating >= 7 ? '#4caf50' : '#ff5252',
            padding:'2px 8px', borderRadius:'20px'
          }}>
            ★ {rating}
          </span>
        </div>
        <p style={{ fontSize:'14px', fontWeight:'500', marginBottom:'6px', lineHeight:'1.3' }}>{title}</p>
        <p style={{ fontSize:'12px', color:'#888', lineHeight:'1.5',
          display:'-webkit-box', WebkitLineClamp:3,
          WebkitBoxOrient:'vertical', overflow:'hidden'
        }}>
          {overview || 'No description available.'}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;