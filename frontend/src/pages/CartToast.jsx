// CartToast.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CartToast({ closeToast }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection:"column"}}>
      <span>🛒 Item added to cart</span>
      <button
        style={{ marginLeft: 16, padding: "6px 8px",background:"black", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", marginTop: "8px" }}
        onClick={() => {
          navigate("/cart");
          closeToast && closeToast();
        }}
      >
        Go to cart
      </button>
    </div>
  );
}
