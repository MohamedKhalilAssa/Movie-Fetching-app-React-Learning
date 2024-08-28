import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieContainer from "./components/MovieContainer";

const App = () => {
  const [searchTerms, setSearchTerms] = useState("Batman");
  const searchHandling = (data) => {
    setSearchTerms(data);
    console.log(searchTerms);
  };
  return (
    <div className="bg-gray-700 min-w-screen min-h-screen p-4 flex items-center flex-col">
      <SearchBar onSubmit={searchHandling} />
      <MovieContainer searchTerms={searchTerms} />
    </div>
  );
};

export default App;
