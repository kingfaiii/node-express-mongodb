import { Pencil, Trash2, Plus, Search, X } from 'lucide-react';
import Button from '../../components/Button';
import FieldLabel from '../../components/Fieldtemp';
import Table from '../../components/Table';

export default function ProductListView({
  filteredProducts,
  loading,
  error,
  search,
  onSearchChange,
  onClearSearch,
  activeCount,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  deleting,
  deleteError,
  confirmationModal,
}) {
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading high-quality products...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">Failed to load products. Please refresh or try again later.</div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {confirmationModal}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">
            Manage your catalog, search quickly, and keep product status visible at a glance.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onAddProduct}
          className="flex items-center justify-center gap-2 px-5 py-3 w-full md:w-auto"
        >
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <FieldLabel
              label="Search products"
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={onSearchChange}
              placeholder="Search by name, SKU, or brand"
              icon={Search}
            />
            <Button
              variant="accent"
              type="button"
              onClick={onClearSearch}
              className="w-full sm:w-auto px-5"
            >
              {search ? (
                <>
                  <X size={18} /> Clear
                </>
              ) : (
                <>
                  <Search size={18} /> Find
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">Filtered products</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredProducts.length}</p>
            </div>
            <div className="rounded-3xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
              Active: {activeCount}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
        {deleteError && (
          <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl mb-4">
            {deleteError.response?.data?.message || 'Could not delete the product. Please try again.'}
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products match your search. Try a different keyword or clear the search.
          </div>
        ) : (
          <Table
            columns={[
              {
                key: 'mainImage',
                title: '',
                render: (value) => (
                  <img
                    src={value}
                    alt="Product"
                    className="w-14 h-14 rounded-xl object-cover"
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
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition ${
                      value
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {value ? 'Active' : 'Draft'}
                  </span>
                ),
              },
              {
                key: '_id',
                title: 'Actions',
                render: (value, row) => (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEditProduct(value)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      aria-label="Edit product"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(value, row.productName)}
                      disabled={deleting}
                      className={`text-red-500 hover:text-red-700 transition ${deleting ? 'opacity-60 cursor-not-allowed' : ''}`}
                      aria-label="Delete product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ),
              },
            ]}
            data={filteredProducts}
          />
        )}
      </div>
    </div>
  );
}
