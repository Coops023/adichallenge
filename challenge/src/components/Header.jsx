import React from "react";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <nav className="navbar navbar-light ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/adidas-logo.png" alt="" width="70" height="50" />
        </Link>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
