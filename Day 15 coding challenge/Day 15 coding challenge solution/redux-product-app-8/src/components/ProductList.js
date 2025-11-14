// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../features/products/productSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleUpdate = () => {
    dispatch(updateProduct({
      id: editingId,
      updates: editForm
    }));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  if (status === 'loading') {
    return <div className="loading">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h1>Product Management</h1>
      <button 
        onClick={() => dispatch(fetchProducts())}
        className="refresh-btn"
      >
        🔄 Refresh Products
      </button>

      <div className="products-grid">
        {items.map((product) => (
          <div key={product.id} className="product-card">
            {editingId === product.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Product Name"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                  placeholder="Price"
                />
                <input
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                  placeholder="Stock"
                />
                <div className="button-group">
                  <button onClick={handleUpdate} className="btn-save">Save</button>
                  <button onClick={() => setEditingId(null)} className="btn-cancel">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
                <div className="button-group">
                  <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;