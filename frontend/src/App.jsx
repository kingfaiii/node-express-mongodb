import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import LoginLayout from './layouts/LoginLayout';
import RegisterForm from './components/auth/RegisterForm';
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
    </Routes>
  );
}

export default App;
