import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  const navStyle = {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "2rem",
    backgroundColor: "#ff6347",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  const linkStyle = {
    color: "white",
    fontWeight: "500",
    fontSize: "1rem",
    textDecoration: "none",
  };

  const linkHover = {
    textDecoration: "underline",
    color: "#ffe2d5",
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={navStyle}>
        <Link to="/admin" style={linkStyle}>Users</Link>
        <Link to="/admin/products" style={linkStyle}>Products</Link>
        <Link to="/admin/orders" style={linkStyle}>Orders</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
