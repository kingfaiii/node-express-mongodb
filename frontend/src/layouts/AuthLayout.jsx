import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="login-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
