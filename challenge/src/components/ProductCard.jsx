import React from "react";
import "./ProductCard.css";

export default function (props) {
  return <div className="product-card">{props.children}</div>;
}
