import useFetch from '../../hooks/useFetch';
import Table from '../../components/Table';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import Button from '../../components/Button';
import FieldLabel from '../../components/Fieldtemp';
export default function Product() {
  const { data, loading, error } = useFetch('/products');
  if (loading) return <div>Loading high-quality products...</div>;
  if (error) return <div>Failed to load products. Please try again.</div>;
  if (!data || data.length === 0) return <div>No products found.</div>;

  return (
    <div className="product-grid p-4 md:p-6">
      {/* Add Product Button */}
      <div className="flex justify-start mb-5">
        <Button
          variant="primary"
          onClick={() => (window.location.href = '/dashboard/products/add')}
          className="flex justify-center items-center gap-2 w-full md:w-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Product</span>
        </Button>
      </div>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="flex-1">
          <FieldLabel htmlFor="search" name="search" id="search" placeholder="Search products..." />
        </div>
        <Button className="flex h-full items-center justify-center w-full sm:w-auto">
          <Search size={20} />
        </Button>
      </div>

      {/* Table Container with Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table
          columns={[
            {
              key: 'mainImage',
              title: '',
              render: (value) => (
                <img
                  src={value}
                  alt="Product"
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                />
              ),
            },
            { key: 'productName', title: 'Name' },
            { key: 'sku', title: 'SKU' },
            { key: 'inventoryStock', title: 'Stock' },
            {
              key: 'price',
              title: 'Price',
              render: (value) => <span className="font-semibold">${value}</span>,
            },
            {
              key: 'isActive',
              title: 'Status',
              render: (value) => (
                <span
                  className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {value ? 'Active' : 'Draft'}
                </span>
              ),
            },
            {
              key: 'Actions',
              title: 'Actions',
              render: () => (
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 active:scale-95 transition">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 active:scale-95 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              ),
            },
          ]}
          data={data}
        />
      </div>
    </div>
  );
}
