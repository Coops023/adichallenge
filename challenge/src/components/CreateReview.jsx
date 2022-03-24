import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateReview.css";

import StarRating from "./StarRating";

export default function CreateReview(props) {
  const starValueHandler = (number) => {
    props.ratingChangeHandler(number);
  };

  return (
    <div className="create-review-container">
      {!props.showForm ? (
        <form className="review-btn-form">
          <button className="form-show-button" onClick={props.showFormHandler}>
            Leave a review
          </button>
        </form>
      ) : (
        <div className="create-review-form-wrap">
          <div className="cancel-star-wrap">
            <button
              className="review-review-button"
              onClick={props.showFormHandler}
            >
              Cancel
            </button>
            <StarRating starValue={starValueHandler} />
          </div>
          <form onSubmit={props.formSubmitHandler}>
            <div className="review-input">
              <input
                className="review-input-field"
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
        </div>
      )}
    </div>
  );
}
