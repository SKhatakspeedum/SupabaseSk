import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../config/supabaseClient';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.title || !formData.price || !formData.description || !formData.location) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
    }

    const { error } = await supabase.from("Product").insert([
      {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        location: formData.location
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/product');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">📦</span>
          <h2 className="auth-title">Add New Product</h2>
          <p className="auth-subtitle">List a new item for sale</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Product Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Item name"
                onChange={handleChange}
                value={formData.title}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                onChange={handleChange}
                value={formData.price}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Where is this item sent from?"
                    onChange={handleChange}
                    value={formData.location}
                    required
                    disabled={loading}
                />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Describe your product..."
                onChange={handleChange}
                value={formData.description}
                required
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                }}
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Adding Product...
              </>
            ) : (
              <>
                <span>➕</span>
                Add Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
