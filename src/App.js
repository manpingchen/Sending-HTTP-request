import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandlers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-movie-890b6-default-rtdb.firebaseio.com/movies.json"
      );

      // bc the SWAPI doesnt reponse the error response
      // hence we check the response "ok" field and throw an error to catch
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      const data = await response.json();

      let loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandlers();
  }, [fetchMoviesHandlers]);

  async function AddMovieHandler(movie) {
    const response = await fetch(
      "https://react-movie-890b6-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (data.name) {
      fetchMoviesHandlers();
    }
  }

  let content = <p>No Movie Found.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className="flex">
      <section className="flex add-movie-section">
        <div className="add-movie-form">
          <AddMovie onAddMovie={AddMovieHandler} />
        </div>
      </section>
      <section className="flex-grow-4">
        <button onClick={fetchMoviesHandlers}>Fetch Movies</button>
        {content}
      </section>
    </div>
  );
}

export default App;
