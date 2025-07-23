import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  const headerStyle = {
    backgroundColor: "#fef4ec",
    padding: "1rem 2rem",
    borderBottom: "2px solid #ff6347",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  };

  const navStyle = {
    display: "flex",
    gap: "1.25rem",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
    color: "#ff6347",
  };

  return (
    <div style={headerStyle}>
      {/* <h1 style={titleStyle}>MERN Frontend</h1> */}
      <h1 style={titleStyle}>Brew & Bite</h1>
      <div style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/cart">MyCart</Link>
        <Link to="/order">MyOrder</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.token ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
