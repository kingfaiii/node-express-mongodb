import { Outlet } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Login;
