import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#008080", textAlign: "center" }}>Product Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Form */}
      <form ref={frmRef} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
        <input name="productName" value={form.productName} type="text" placeholder="Product Name" onChange={handleChange} required style={inputStyle} />
        <input name="description" value={form.description} type="text" placeholder="Description" onChange={handleChange} required style={inputStyle} />
        <input name="price" value={form.price} type="text" placeholder="Price" onChange={handleChange} required style={inputStyle} />
        <input name="imgUrl" value={form.imgUrl} type="text" placeholder="Image Url" onChange={handleChange} required style={inputStyle} />

        {editId ? (
          <>
            <button onClick={handleUpdate} style={buttonStyle}>Update</button>
            <button onClick={handleCancel} style={{ ...buttonStyle, backgroundColor: "gray" }}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd} style={buttonStyle}>Add</button>
        )}
      </form>

      {/* Search */}
      <div style={{ marginBottom: "15px" }}>
        <input type="text" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search by name..." style={{ ...inputStyle, width: "200px" }} />
        <button onClick={fetchProducts} style={{ ...buttonStyle, marginLeft: "10px" }}>Search</button>
      </div>

      {/* Product Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image Url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((value) => (
            <tr key={value._id}>
              <td>{value.productName}</td>
              <td>{value.description}</td>
              <td>{value.price}</td>
              <td><img src={value.imgUrl} width="50" alt="product" /></td>
              <td>
                <button onClick={() => handleEdit(value)} style={actionBtn}>Edit</button>
                <button onClick={() => handleDelete(value._id)} style={{ ...actionBtn, backgroundColor: "#f44336" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} style={buttonStyle}>Previous</button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={buttonStyle}>Next</button>
      </div>
    </div>
  );
}

// Inline styles
const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  minWidth: "150px"
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#2196F3",
  color: "white",
  cursor: "pointer",
};

const actionBtn = {
  ...buttonStyle,
  margin: "2px",
  backgroundColor: "#4CAF50"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};
