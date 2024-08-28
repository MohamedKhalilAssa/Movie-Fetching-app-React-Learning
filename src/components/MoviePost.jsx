import React from "react";

const MoviePost = (props) => {
  return (
    <div className="bg-gray-900 w-64 h-80 relative rounded-lg text-gray-200 shadow-xl ">
      <div className="imgContainer w-full h-full rounded-lg">
        <img
          src={props.movie.Poster}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="textContainer absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-b-lg opacity-65 flex flex-col justify-end pb-8 p-2">
        <h1 className="text-2xl font-bold text-white ">{props.movie.Title}</h1>
        <p>{props.movie.Year}</p>
      </div>
    </div>
  );
};

export default MoviePost;
