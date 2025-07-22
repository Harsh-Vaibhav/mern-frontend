import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      padding: "20px",
      background: "linear-gradient(to bottom right, #f9f9f9, #e0e0e0)",
      minHeight: "100vh"
    }}>
      {products &&
        products.map((product) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              width: "250px",
              textAlign: "center",
              transition: "transform 0.3s ease, background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "#f0f8ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            <img
              src={product.imgUrl}
              alt={product.productName}
              style={{ width: "100%", borderRadius: "8px", height: "200px", objectFit: "cover" }}
            />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <h4 style={{ color: "#2c3e50" }}>₹{product.price}</h4>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "10px 16px",
                marginTop: "10px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d6fa5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3498db")}
            >
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}
