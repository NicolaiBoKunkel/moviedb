import { useState, useEffect } from "react";

function MovieCard({ movie }) {
    const [trailerKey, setTrailerKey] = useState(null);
    const posterBasePath = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
    const trailerBaseUrl = 'https://www.youtube.com/watch?v=';


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e46278258cc52ec12ec6d0d0582c89b7`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setTrailerKey(data.results[0].key);
                }
            })
            .catch(error => console.log('Error fetching trailer:', error));
    }, [movie.id]);

    //håndter trailer i nyt tab
    const handlePlayTrailer = () => {
        if (trailerKey) {
            window.open(trailerBaseUrl + trailerKey);
        } else {
            console.log('No trailer found');
        }
    };

    // JSX
    return (
        <div className="col-lg-2 mb-4">
            <div className="card">
                <img src={posterBasePath + movie.poster_path} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title "><span>{movie.title.substring(0, 200)}</span></h5>
                    <span className="far fa-star" aria-hidden="true"></span><span className="ml-1">{movie.vote_average}</span>
                    <p className="card-text">{movie.overview.substring(0, 125).concat('....')}</p>
                    <div className="d-flex justify-content-between p-0">
                        <span className="far fa-calendar" aria-hidden="true"> {movie.release_date}</span>
                        <span className="far fa-play-circle play-icon" onClick={handlePlayTrailer}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
