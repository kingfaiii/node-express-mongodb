import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react'; // 1. Import Icons
import logo from '../assets/logo.png'; // 2. Import your logo

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
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto w-16 h-16 mb-4 object-contain"
          />

          <h2 className="text-2xl font-bold text-center text-primary mb-8 tracking-tight">
            {title}
          </h2>

          {/* 2. ENHANCED ERROR: Added AlertCircle icon */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
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
