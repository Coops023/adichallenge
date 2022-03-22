import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function header() {
  return (
    <nav className="navbar navbar-light ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/adidas-logo.png" alt="" width="70" height="50" />
        </Link>
      </div>
    </nav>
  );
}
