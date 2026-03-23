import { useLocation, Link } from 'react-router-dom';
import navItems from '../utils/sideBarNavItems';
import { Menu, X, Bolt } from 'lucide-react';

export default function Sidebar({ open, sidebarButton }) {
  const location = useLocation();
    
  return (
    <aside
      className={`transition-all duration-300 bg-white text-primary flex flex-col border-r border-gray-200 ${
        open ? 'w-50' : 'w-20'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10  flex items-center justify-center">
            <button
              onClick={sidebarButton}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={!open ? item.label : ''}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-white'
                  : 'hover:bg-gray-700 hover:text-white text-primary'
              } ${open ? 'justify-start' : 'justify-center'}`}
            >
              {item.icon}
              {open && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 ${
            open ? 'justify-start' : 'justify-center'
          }`}
        >
          <Bolt size={20} />
          {open && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
}
