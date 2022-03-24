import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";
import ReactPaginate from "react-paginate";
import Hero from "../components/Hero";
import GoBackBtn from "../components/GoBackBtn";

export default function ProductList() {
//state variables used for error handling, loading and 
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  

  //variables used in displayItems pagination function
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  //useEffect to call the API and set the items to data from response
  useEffect(() => {
    axios
      .get(`/api1/product`)
      .then((response) => {
        //the data set provided from the API gave duplicates, so here i have created a variable called uniqueItems which returns an array of objects without duplicates
        // console.log("response", response.data);
        const uniqueItems = [
          ...new Map(
            response.data.map((item) => [JSON.stringify(item), item])
          ).values(),
        ];
        //here the items variable is setting the value of unique items
        setItems(uniqueItems);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // displayItems is used in the pagination of the products that are fetched from the api. it works by using the Array.slice() method taking some variables declared on lines 18-20 as values to determine where the array is sliced. Then the array is mapped over to render values from the array.
  const displayItems = items
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => {
      return (
        <>
          <ProductCard key={item.id}>
            <Link className="product-link" to={`/product/${item.id}`}>
              <img className="product-img" src={item.imgUrl} alt="product" />
              <div className="price-name-wrap">
                <p className="product-text">{item.name}</p>
                <p className="product-text">${item.price}</p>
              </div>
            </Link>
          </ProductCard>
        </>
      );
    });

    //pageCount rounds up the recieved values to ensure a single intiger can be rendered in the pagination 
  const pageCount = Math.ceil(items.length / itemsPerPage);

  //page changing function for the pagination
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (error) {
    return (
      <>
        <GoBackBtn />
        <div className="error">
          <img src="/emptybox.png" alt="error" width={100} />
          <h5>Oops! Something went wrong</h5>
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <div className="loading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-list-container">
        <Hero />
        <h3 className="the-best-h3">The best from adidas</h3>
        <div className="card-container">{displayItems}</div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination-btns"}
          previousLinkClassName={"prev-btn"}
          nextLinkClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    );
  }
}
