import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import LoginLayout from './layouts/LoginLayout';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './layouts/Dashboard';
import ProtectedRoute from './features/auth/ProtectedRoutes';
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
