import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReview from "../components/CreateReview";
import "./Reviews.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Reviews(props) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [productId, setProductId] = useState(id);
  const [locale, setLocale] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const reviewsPerPage = 4;
  const pagesVisited = pageNumber * reviewsPerPage;

  useEffect(() => {
    axios.get(`/api2/reviews/${id}`).then((response) => {
      // console.log("response from review API", response);
      setReviews(response.data);
      setIsLoaded(true);
    });
  }, []);

  const showFormHandler = (e) => {
    e.preventDefault();
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const requestBody = { productId, locale, rating, text };
    console.log("requestbody", requestBody);

    await axios.post(`/api2/reviews/${productId}`, requestBody);
    axios.get(`/api2/reviews/${id}`).then((response) => {
      // console.log("response from review API", response);
      setReviews(response.data);
      showFormHandler(e);
      setIsLoaded(true);
    });
  };

  const displayReviews = reviews
    .slice(pagesVisited, pagesVisited + reviewsPerPage)
    .map((review, index) => {
      return (
        <div key={index} className="review-card">
          <div>{review.text}</div>
          {new Array(review.rating).fill(null).map((star, index) => (
            <FontAwesomeIcon key={index} className="star-icon" icon={faStar} />
          ))}
        </div>
      );
    });

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };
  const ratingChangeHandler = (number) => {
    // console.log("lift", number);
    setRating(number);
  };

  return (
    <>
      <div>
        {!isLoaded ? (
          <>
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </>
        ) : reviews.length === 0 ? (
          <div className="no-review-text">No reviews for this product</div>
        ) : (
          <div className="review-container">
            <h5 className="review-heading">Reviews</h5>

            <div>{displayReviews}</div>
            <ReactPaginate
              previousLabel={"Back"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination-review"}
              previousLinkClassName={"prev-btn"}
              nextLinkClassName={"next-btn"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
            />
          </div>
        )}
      </div>
      <CreateReview
        showForm={showForm}
        showFormHandler={showFormHandler}
        ratingChangeHandler={ratingChangeHandler}
        textChangeHandler={textChangeHandler}
        formSubmitHandler={formSubmitHandler}
        productId={id}
      />
    </>
  );
}
