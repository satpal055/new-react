import React from 'react'
import Movienavbar from './Movienavbar'

export default function Moviecard({ movie }) {
    function onFavClick() {
        alert("clicked")

    }
    return (
        < >
            <div className='movie_card'>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className='movie-overlay'>
                        <button className='fav_button' onClick={onFavClick}> ♡</button>
                    </div>
                </div>
                <div className='movie-info'>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            </div>
        </>
    )
}
