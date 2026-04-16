import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Product from './pages/Product/Product';
import HomePage from './pages/HomePage';
import Dashboard from './layouts/Dashboard';
import ProtectedRoute from './features/auth/ProtectedRoutes';
import AddProduct from './pages/Product/AddProduct';
import SingleProduct from './pages/Product/SingleProduct';
function App() {
  return (
    <Routes>
      {/* Main & Auth Layouts look good! */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route
          path="/dashboard"
          element={<Dashboard dashboardName="Dashboard" />}
        >
          <Route path="products" element={<Product />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<SingleProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
