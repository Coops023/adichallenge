import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="header-background">
      <img
        className="adidas-header-text"
        src="/adidas-text.png"
        alt="adidas-text"
      />

      <p className="p-main">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ex illum
        id minima facilis velit, consequatur animi praesentium? Veritatis
        inventore fuga debitis voluptas vel minus totam quisquam. Asperiores,
        ducimus dignissimos.
      </p>
    </div>
  );
}
