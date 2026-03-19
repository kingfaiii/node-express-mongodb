import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button';
import logo from '../../assets/logo.png';
import LabelField from '../Fieldtemp';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <img src={logo} alt="Logo" className="mx-auto w-20 h-20" />
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Login
          </h2>

          {/* 4. FEEDBACK: Show backend errors to the user */}
          {error && (
            <p className="mb-4 text-center text-red-500 text-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-primary">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition border-primary-light bg-surface focus:border-accent"
              />
            </div>

            {/* Password Field */}
            <div>
              <LabelField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              >
                Password
              </LabelField>
            </div>

            <Button type="submit" isLoading={loading} className="mt-6">
              Login
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-muted">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-accent font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
