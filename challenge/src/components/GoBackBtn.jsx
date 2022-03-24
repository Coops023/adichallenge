import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./GoBackBtn.css";

export default function GoBackBtn() {
  const navigate = useNavigate();
  return (
    <Link className="go-back" onClick={() => navigate(-1)} to="#">
      Go Back
    </Link>
  );
}
