import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateReview.css";

import StarRating from "./StarRating";

export default function CreateReview(props) {
  const starValueHandler = (number) => {
    props.ratingChangeHandler(number);
  };

  return (
    <div>
      {!props.showForm ? (
        <form>
          <button className="review-button" onClick={props.showFormHandler}>
            Leave a review
          </button>
        </form>
      ) : (
        <>
          <button
            className="review-review-button"
            onClick={props.showFormHandler}
          >
            Cancel
          </button>
          <StarRating starValue={starValueHandler} />

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
