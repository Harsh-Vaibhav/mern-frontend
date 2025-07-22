import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3 style={{ textAlign: "center", color: "#00BFFF" }}>My Orders</h3>
      {orders &&
        orders.map((order) => (
          <div key={order._id} style={{
            background: "#f4f4f4",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)"
          }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#e0e0e0" }}>
                <tr>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>Product</th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>Price</th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>Qty</th>
                  <th style={{ padding: "8px", border: "1px solid #ccc" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{item.productName}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>₹{item.price}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{item.qty}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>₹{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
