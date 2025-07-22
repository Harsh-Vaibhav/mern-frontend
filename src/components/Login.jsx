import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(-45deg, #ffecd2, #fcb69f, #ff6f61, #ff9a9e)",
    backgroundSize: "400% 400%",
    animation: "gradientAnimation 12s ease infinite",
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "95%",
    marginTop: "0.5rem",
    marginBottom: "1rem",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "0.5rem",
    backgroundColor: "#ff6347",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    transition: "background-color 1.0s ease",
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        <input
          type="text"
          placeholder="Email Address"
          style={inputStyle}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
        <hr style={{ margin: "1.5rem 0" }} />
        <p style={{ textAlign: "center" }}>
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
