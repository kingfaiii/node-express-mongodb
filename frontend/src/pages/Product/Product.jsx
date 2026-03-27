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
    <div className="product-grid">
      <div className="flex justify-start w-1/6 mb-5 ">
        <Button
          variant="primary"
          className="flex justify-center items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </Button>
      </div>
      <div className="flex items-center align-middle justify-items-center mb-5">
        <div className='w-4/5'>
          <FieldLabel htmlFor="search" placeholder="Search products..." />
        </div>
        <div className='w-1/5'>
          <Button>
            <Search size={20} />
          </Button>
        </div>
      </div>
      <Table
        columns={[
          { key: 'productName', title: 'Name' },
          { key: 'sku', title: 'SKU' },
          { key: 'inventoryStock', title: 'Stock' },
          {
            key: 'price',
            title: 'Price',
            render: (value) => <span className="">${value}</span>,
          },
          {
            key: 'isActive',
            title: 'Status',
            render: (value) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
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
                <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            ),
          },
        ]}
        data={data}
      />
    </div>
  );
}
