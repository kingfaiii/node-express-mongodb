import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="mb-6 capitalize">
      <ol className="flex items-center gap-2">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-accent transition-colors"
          >
            <Home size={16} />
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-gray-400" />
              {!last ? (
                <Link
                  to={to}
                  className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                >
                  {value}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-gray-900 capitalize">
                  {value}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
