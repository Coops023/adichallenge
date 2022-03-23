import axios from "axios";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

import { useParams } from "react-router-dom";
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
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-details-container">
        <img className="product-img" src={item.imgUrl} alt="product" />
        <div className="name-price-wrap">
          <p className="product-text">{item.name}</p>
          <p className="product-text">
            {item.currency}
            {item.price}
          </p>
        </div>
        <h5 className="product-text">{item.description}</h5>
        <p className="lorem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus reprehenderit molestias maxime nam quisquam dicta
          facere blanditiis sequi et. Laboriosam accusantium ut deserunt fugit
          ea atque ducimus blanditiis, nemo ullam.
        </p>

        <Reviews />
      </div>
    );
  }
}
