import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import logo from '../assets/logo.png';

export default function Form({
  title,
  children,
  onSubmit,
  error = '',
  footerText = "Don't have an account?",
  footerLink = '/register',
  footerLinkText = 'Sign up',
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 relative">
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Store
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="mx-auto w-16 h-16 mb-4 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>

          <h2 className="text-2xl font-bold text-center text-primary mb-8 tracking-tight">
            {title}
          </h2>

          {error && (
            <div className="mb-4 flex items-center gap-2 text-red-600 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} className="shrink-0" />
              <span className="text-xs font-semibold tracking-tight leading-tight">
                {error}
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {children}
          </form>

          <p className="text-center mt-8 text-sm text-muted">
            {footerText}{' '}
            <Link
              to={footerLink}
              className="text-accent font-semibold hover:underline inline-flex items-center gap-1 group"
            >
              {footerLinkText}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
