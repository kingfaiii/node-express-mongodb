import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Package, TrendingUp, ShoppingCart, Home } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-muted">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Breadcrumb />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card title="Total Products" value="1,234" icon={<Package />} />
            <Card title="Total Sales" value="$45,678" icon={<TrendingUp />} />
            <Card title="Pending Orders" value="42" icon={<ShoppingCart />} />
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({ open }) {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    {
      label: 'Products',
      icon: <Package size={20} />,
      path: '/dashboard/products',
    },
    {
      label: 'Sales',
      icon: <TrendingUp size={20} />,
      path: '/dashboard/sales',
    },
    {
      label: 'Orders',
      icon: <ShoppingCart size={20} />,
      path: '/dashboard/orders',
    },
  ];

  return (
    <aside
      className={`transition-all duration-300 bg-primary text-white flex flex-col border-r border-gray-700 ${
        open ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Home size={20} />
          </div>
          {open && <span className="font-bold text-lg">Admin</span>}
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
                  : 'hover:bg-gray-700 text-gray-200'
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

      <div className="border-t border-gray-700 p-4">
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
            open ? 'justify-start' : 'justify-center'
          }`}
        >
          <span className="text-lg">⚙️</span>
          {open && <span className="text-sm font-medium">Settings</span>}
        </button>
      </div>
    </aside>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <Link to="/dashboard" className="hover:text-primary">
        Dashboard
      </Link>
      <span>/</span>
      <span className="text-primary font-medium">Overview</span>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
        <div className="text-accent">{icon}</div>
      </div>
    </div>
  );
}
