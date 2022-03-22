import React from "react";
import ReactStars from "react-rating-stars-component";

export default function StarRating(props) {
  const ratingChanged = (newRating) => {
    // console.log(newRating);
    props.starValue(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
    />
  );
}
