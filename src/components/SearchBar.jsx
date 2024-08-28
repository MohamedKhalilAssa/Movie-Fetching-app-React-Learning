import React from "react";
import { useState } from "react";
const SearchBar = (props) => {
  // functions
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(document.getElementById("MovieTitle").value);
  };
  // clearInput
  const clearInput = () => {
    if (!is_empty) {
      document.getElementById("MovieTitle").value = "";
      setIsEmpty(true);
    }
  };
  const [is_empty, setIsEmpty] = useState(true);
  return (
    <div className="bg-gray-900 w-full sm:w-3/4  rounded-lg text-gray-200 shadow-xl flex items-center">
      <form onSubmit={submitHandler} className="w-full  p-4">
        <input
          type="text"
          placeholder="Search Movie ... "
          id="MovieTitle"
          className="w-full h-full bg-transparent border-none outline-none
        "
          onChange={(e) => {
            if (e.target.value.trim() == "") {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          }}
        />
      </form>
      <i
        className={`fa-solid ${
          is_empty ? "hidden" : "fa-xmark"
        }  mr-3 text-lg cursor-pointer`}
        id="magnifyingGlass"
        onClick={clearInput}
      ></i>
      <i
        className={`fa-solid fa-magnifying-glass mr-3 text-lg cursor-pointer`}
        id="magnifyingGlass"
        onClick={submitHandler}
      ></i>
    </div>
  );
};

export default SearchBar;
