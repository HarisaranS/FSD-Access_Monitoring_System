import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="section-container">
            <div className="footer-grid">
              <div>
                <div className="nav-brand" style={{ marginBottom: '16px' }}>ZERO_TRUST</div>
                <p className="text-muted" style={{ fontSize: '14px' }}>
                  Secure autonomous marketplace powered by adaptive risk monitoring and 
                  post-quantum encryption standards.
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '16px' }}>RESOURCES</h4>
                <ul style={{ listStyle: 'none', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Security Whitepaper</li>
                  <li style={{ marginBottom: '8px' }}>API Documentation</li>
                  <li>System Status</li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '16px' }}>LEGAL</h4>
                <ul style={{ listStyle: 'none', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>Privacy Protocol</li>
                  <li style={{ marginBottom: '8px' }}>Terms of Operation</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)' }}>
              <span>© 2026 ZERO_TRUST_INFRASTRUCTURE. ALL_RIGHTS_RESERVED.</span>
              <span>SECURE_CONNECTION_ESTABLISHED</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
