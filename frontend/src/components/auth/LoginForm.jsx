import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock } from 'lucide-react'; // Added icons for that "Elite" look
import Form from '../Form'; // Import your generic Form wrapper
import LabelField from '../Fieldtemp';
import Button from '../Button';

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
    <Form
      title="Login"
      onSubmit={handleSubmit}
      error={error}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
    >
      {/* 1. Using LabelField with Lucide Icons */}
      <LabelField
        label="Email Address"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        required
        placeholder="Enter your email"
      />

      <LabelField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={Lock}
        required
        placeholder="••••••••"
      />

      {/* 2. Using your custom Button component */}
      <Button type="submit" isLoading={loading} className="mt-4">
        Login to Account
      </Button>
    </Form>
  );
}
