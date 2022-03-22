import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateReview.css";

import StarRating from "./StarRating";

export default function CreateReview(props) {
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = (e) => {
    e.preventDefault();
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const starValueHandler = (number) => {
    props.ratingChangeHandler(number);
  };

  return (
    <div>
      {!showForm ? (
        <form>
          <button className="review-button" onClick={showFormHandler}>
            Leave a review
          </button>
        </form>
      ) : (
        <>
          <StarRating starValue={starValueHandler} />
          <button onClick={showFormHandler}>Cancel</button>
          <form onSubmit={props.formSubmitHandler}>
            <div className="review-input">
              <label for="text">New Review</label>
              <input
                onChange={props.textChangeHandler}
                name="text"
                type="text"
                required={true}
                placeholder="Leave review"
              />
            </div>

            <button type="submit" className="review-button">
              Submit Review
            </button>
          </form>
        </>
      )}
    </div>
  );
}
