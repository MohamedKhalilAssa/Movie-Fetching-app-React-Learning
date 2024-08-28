import React, { useEffect, useState, useCallback } from "react";
import MoviePost from "./MoviePost";

const MovieContainer = ({ searchTerms }) => {
  const API_URL = `https://www.omdbapi.com/?s=${searchTerms}&apikey=e27ca18f`;
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showCount, setShowCount] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    async (page = 1, resetMovies = false) => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}&page=${page}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.Response === "True") {
          if (resetMovies) {
            setMovies(data.Search);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...data.Search]);
          }
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    },
    [API_URL]
  );

  useEffect(() => {
    if (searchTerms) {
      setMovies([]);
      setPageNumber(1);
      fetchMovies(1, true);
    }
  }, [searchTerms]);

  const loadMore = () => {
    setShowCount((showCount) => showCount + 5);
    if (showCount >= movies.length && !loading) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      fetchMovies(nextPage);
    }
  };

  return (
    <>
      <div className="text-white flex gap-8 justify-center sm:justify-around flex-wrap mt-12 w-full sm:px-16">
        {error ? (
          <p>{error}</p>
        ) : movies.length === 0 && loading ? (
          "Loading..."
        ) : movies.length > 0 ? (
          movies
            .slice(0, showCount)
            .map((movie) => <MoviePost key={movie.imdbID} movie={movie} />)
        ) : (
          "No Results!"
        )}
      </div>
      {movies.length > 0 && (
        <button
          className="bg-gray-900 text-gray-200 rounded-lg px-4 py-2 mt-8"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </>
  );
};

export default MovieContainer;
