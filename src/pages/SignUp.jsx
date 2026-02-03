import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from '../config/supabaseClient';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    usr_name: "",
    usr_email: "",
    usr_password: "",
    usr_contact: "",
    usr_age: "",
    usr_gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("User").insert([
      {
        ...formData,
        usr_status: true,
        usr_role: "buyer", // default role
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Signup successful! Please login to continue.");
      navigate('/signin');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">✨</span>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us and start ordering today!</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="usr_name">Full Name *</label>
              <input
                id="usr_name"
                name="usr_name"
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                value={formData.usr_name}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="usr_email">Email Address *</label>
              <input
                id="usr_email"
                name="usr_email"
                type="email"
                placeholder="your.email@example.com"
                onChange={handleChange}
                value={formData.usr_email}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="usr_password">Password *</label>
              <input
                id="usr_password"
                name="usr_password"
                type="password"
                placeholder="Create a strong password"
                onChange={handleChange}
                value={formData.usr_password}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label htmlFor="usr_contact">Contact Number</label>
              <input
                id="usr_contact"
                name="usr_contact"
                type="tel"
                placeholder="Phone number"
                onChange={handleChange}
                value={formData.usr_contact}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="usr_age">Age</label>
              <input
                id="usr_age"
                name="usr_age"
                type="number"
                placeholder="Your age"
                onChange={handleChange}
                value={formData.usr_age}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="usr_gender">Gender</label>
              <select
                id="usr_gender"
                name="usr_gender"
                onChange={handleChange}
                value={formData.usr_gender}
                disabled={loading}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                <span>✨</span>
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
