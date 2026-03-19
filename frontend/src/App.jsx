import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
