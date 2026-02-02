import './App.css'
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Signup from './pages/SignUp';
import Login from './pages/Login';

function App() {

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
            <NavLink to="/orders" className="nav-link">
              <span className="nav-icon">📋</span>
              Orders
            </NavLink>
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
  )
}

export default App
