import './App.css'
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Signup from './pages/SignUp';
import Login from './pages/Login';

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🛍️</span>
            <h1 className="logo-text">MyOrder</h1>
          </div>
          
          <nav className="nav">
            <NavLink to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </NavLink>
            <NavLink to="/product" className="nav-link">
              <span className="nav-icon">📦</span>
              Products
            </NavLink>
            {/* <NavLink to="/orders" className="nav-link">
              <span className="nav-icon">📋</span>
              Orders
            </NavLink> */}
            
            {isAuthenticated ? (
              <>
                <span className="nav-link" style={{ cursor: 'default', background: 'transparent' }}>
                  <span className="nav-icon">👤</span>
                  {user?.usr_name}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="nav-link" 
                  style={{ cursor: 'pointer', border: '1px solid rgba(255, 100, 100, 0.3)' }}
                >
                  <i className="fa-solid fa-right-from-bracket nav-icon"></i>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin" className="nav-link">
                  <i className="fa-solid fa-right-to-bracket nav-icon"></i>
                </NavLink>
                {/* <NavLink to="/signup" className="nav-link">
                  <span className="nav-icon">✨</span>
                  Sign Up
                </NavLink> */}
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
