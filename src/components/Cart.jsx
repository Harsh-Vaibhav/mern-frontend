import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "2rem",
      background: "#f4f8fb",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    },
    cartItem: {
      background: "#ffffff",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    },
    cartItemHover: {
      background: "#e0f7fa",
      transform: "scale(1.01)",
    },
    button: {
      margin: "0 0.5rem",
      padding: "0.3rem 0.8rem",
      fontSize: "1rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    orderButton: {
      marginTop: "1rem",
      padding: "0.6rem 1.2rem",
      fontSize: "1rem",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "magenta", textAlign: "center" }}>My Cart</h2>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li
                  key={value._id}
                  style={styles.cartItem}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.cartItemHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, styles.cartItem)
                  }
                >
                  <strong>{value.productName}</strong> - ₹{value.price}{" "}
                  <button style={styles.button} onClick={() => decrement(value._id, value.qty)}>-</button>
                  {value.qty}
                  <button style={styles.button} onClick={() => increment(value._id, value.qty)}>+</button>
                  = ₹{value.price * value.qty}
                </li>
              )
          )}
      </ul>
      <h4>Total: ₹{orderValue}</h4>
      {user?.token ? (
        <button style={styles.orderButton} onClick={placeOrder}>Place Order</button>
      ) : (
        <button style={styles.orderButton} onClick={() => Navigate("/login")}>Login to Order</button>
      )}
    </div>
  );
}
