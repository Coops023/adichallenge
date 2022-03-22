import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReview from "../components/CreateReview";
export default function Reviews(props) {
  const { id } = useParams();
  const [reviews, setReviews] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api2/reviews/${id}`).then((response) => {
      // console.log("response from review API", response);
      setReviews(response.data);
      setIsLoaded(true);
    });
  }, [reviews]);

  return (
    <>
      <CreateReview productId={id} />
      <div>
        {!isLoaded ? (
          <>
            <div>loading</div>
          </>
        ) : reviews.legnth === 0 ? (
          <div>Loading</div>
        ) : (
          <div>
            {reviews.map((review) => {
              return (
                <div>
                  {" "}
                  <div>{review.rating}</div> <div>{review.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
