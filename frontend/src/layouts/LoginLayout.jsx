import { Navbar } from '../components/navbar';

const Login = () => {
  return (
    <div className="login-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Login;
