import React from "react";
import ReactStars from "react-rating-stars-component";

export default function StarRating(props) {
  //When the star rating is changed state is lifted through props.starValue into createReview component
  //newRating value is built into the npm package "react-rating-stars-component" when changed
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
