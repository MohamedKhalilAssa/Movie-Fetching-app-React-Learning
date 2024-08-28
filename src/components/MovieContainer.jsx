import React, { useEffect, useState } from "react";
import MoviePost from "./MoviePost";

const MovieContainer = (props) => {
  const API_URL = `https://www.omdbapi.com/?s=${props.searchTerms}&apikey=e27ca18f`;
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showCount, setShowCount] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchMovies = (page = 1) => {
    fetch(`${API_URL}&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      })
      .catch((error) => {
        setError("Failed to fetch movies");
      });
  };
  useEffect(() => {
    if (props.searchTerms === "") {
      setMovies("No Result!");
      return;
    }
    fetchMovies();
  }, [props.searchTerms]);

  const loadingMore = () => {
    setShowCount(showCount + 5);
    if (showCount >= movies.length) {
      setPageNumber((prevNumber) => prevNumber + 1);
      let oldMovies = movies;
      fetchMovies(pageNumber);
      setMovies([...oldMovies, ...movies]);
    }
  };
  return (
    <>
      <div className="text-white flex gap-8 justify-center sm:justify-around flex-wrap mt-12 w-full sm:px-16">
        {error ? (
          <p>{error}</p>
        ) : movies === "No Result!" ? (
          movies
        ) : movies.length > 0 ? (
          movies
            .slice(0, showCount)
            .map((movie) => <MoviePost key={movie.imdbID} movie={movie} />)
        ) : (
          "Loading...."
        )}
      </div>
      <button
        className="bg-gray-900 text-gray-200 rounded-lg px-4 py-2 mt-8"
        onClick={() => loadingMore()}
      >
        Show More
      </button>
    </>
  );
};

export default MovieContainer;
