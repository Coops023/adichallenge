import React, { useEffect, useState } from "react";
import axios from "axios";

import StarRating from "./StarRating";

export default function CreateReview(props) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("test review");
  const [productId, setProductId] = useState(props.productId);
  const [locale, setLocale] = useState("");

  const showFormHandler = (e) => {
    e.preventDefault();
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const starValueHandler = (number) => {
    // console.log("star value", number);
    setRating(number);
    console.log(rating);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const requestBody = { productId, locale, rating, text };
    console.log("requestbody", requestBody);

    axios
      .post(`/api2/reviews/${productId}`, requestBody)
      .then((response) => {
        console.log("response from review API", response);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      {!showForm ? (
        <form>
          <button onClick={showFormHandler}>Create a review</button>
        </form>
      ) : (
        <>
          <StarRating starValue={starValueHandler} />
          <form onSubmit={formSubmitHandler}>
            <button>Submit Review</button>
          </form>
        </>
      )}
    </div>
  );
}
