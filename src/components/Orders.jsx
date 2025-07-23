import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import { useFetcher } from "react-router-dom";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", color: "#008080" }}>Order Management</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {orders &&
          orders.map((order) => (
            <li
              key={order._id}
              style={{
                background: "#fefefe",
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxShadow: "0 0 5px rgba(0,0,0,0.05)"
              }}
            >
              <strong>{order._id}</strong> - ₹{order.orderValue} - <em>{order.status}</em>
              {order.status === "Pending" && (
                <div style={{ marginTop: "0.5rem" }}>
                  <button
                    onClick={() => updateOrder("cancelled", order._id)}
                    style={{
                      background: "#ff6961",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateOrder("completed", order._id)}
                    style={{
                      background: "#77dd77",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Complete
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            marginRight: "1rem",
            padding: "8px 16px",
            backgroundColor: page === 1 ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: page === 1 ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease"
          }}
        >
          Previous
        </button>

        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            marginLeft: "1rem",
            padding: "8px 16px",
            backgroundColor: page === totalPages ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
