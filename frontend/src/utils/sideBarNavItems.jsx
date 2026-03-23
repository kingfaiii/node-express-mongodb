import { Home, Package, TrendingUp, ShoppingCart } from 'lucide-react';


export default [
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


