import axios from "axios";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

import { useParams } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";

export default function ProductDetails() {
  //  use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams();

  const [item, setItem] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  //useEffect to request a product with a specific ID and set item state
  useEffect(() => {
    axios
      .get(`/api1/product/${id}`)
      .then((response) => {
        // console.log("response from API", response);
        setItem(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="product-details-container">
        <img src={item.imgUrl} alt="" />

        <Reviews />
      </div>
    );
  }
}
