import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from '../config/supabaseClient';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Query without .single() to avoid error when no rows found
      const { data, error: loginError } = await supabase
        .from("User")
        .select("*")
        .eq("usr_email", email)
        .eq("usr_password", password);

      setLoading(false);

      if (loginError) {
        console.error("Login error:", loginError);
        setError("An error occurred during login. Please try again.");
        return;
      }

      // Check if we got any results
      if (!data || data.length === 0) {
        setError("Invalid email or password. Please check your credentials.");
        return;
      }

      // Get the first (and should be only) user
      const user = data[0];
      console.log('data:>>',data)

      // Save user to context and localStorage
      login(user);
      navigate('/');
    } catch (err) {
      setLoading(false);
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <span className="auth-icon">🔑</span>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue shopping</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                value={email}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                value={password}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <span>🔑</span>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
