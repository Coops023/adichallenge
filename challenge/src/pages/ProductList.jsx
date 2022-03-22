import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";
import ReactPaginate from "react-paginate";

export default function ProductList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  //variables used in displayItems pagination function
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
        setItems(uniqueItems);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // displayItems is used in the pagination of the products that are fetched from the api
  const displayItems = items
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => {
      return (
        <ProductCard key={item.id}>
          <Link className="product-link" to={`/product/${item.id}`}>
            <img className="product-img" src={item.imgUrl} alt="product" />
            <div className="price-name-wrap">
              <p className="product-text">{item.name}</p>
              <p className="product-text">${item.price}</p>
            </div>
          </Link>
        </ProductCard>
      );
    });

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
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
      </>
    );
  }
}
