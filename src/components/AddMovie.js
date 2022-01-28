import React, { useRef } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = (props) => {
  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      releaseDate: releaseDateRef.current.value,
      openingText: openingTextRef.current.value,
    };

    props.onAddMovie(movie);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea row="5" id="opening-text" ref={openingTextRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="release-date">Release Date</label>
        <input type="text" id="release-date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
