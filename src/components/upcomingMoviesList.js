import { useFetchUpcomingMoviesQuery } from '../store'; 
import MovieCard from './movieCard';

function UpcomingMovies() {
  const { data, error, isFetching } = useFetchUpcomingMoviesQuery();

  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error loading movies.</div>;
  } else {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const upcomingMovies = data.results.filter(movie => {
      return movie.release_date >= currentDate; 
    });

    content = data.results.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ));
  }

  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {content}
    </div>
  );
}

export default UpcomingMovies;
