import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { useProducts } from '../../features/products/useProducts';
import ProductListView from '../../features/products/ProductListView';

export default function Product() {
  const navigate = useNavigate();
  const {
    filteredProducts,
    loading,
    error,
    search,
    setSearch,
    clearSearch,
    activeCount,
    handleDelete,
    deleting,
    deleteError,
  } = useProducts();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

  const openDeleteModal = (id, name) => setDeleteModal({ isOpen: true, id, name });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, id: null, name: '' });

  const confirmDelete = async () => {
    const deleted = await handleDelete(deleteModal.id);
    if (deleted) {
      closeDeleteModal();
    }
  };

  return (
    <ProductListView
      filteredProducts={filteredProducts}
      loading={loading}
      error={error}
      search={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      onClearSearch={clearSearch}
      activeCount={activeCount}
      onAddProduct={() => navigate('/dashboard/products/add')}
      onEditProduct={(id) => navigate(`/dashboard/products/edit/${id}`)}
      onDeleteProduct={openDeleteModal}
      deleting={deleting}
      deleteError={deleteError}
      confirmationModal={
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          title="Confirm Delete"
        >
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to permanently delete "{deleteModal.name}"? This action cannot be undone.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDeleteModal}
              className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleting}
              className={`w-full sm:w-auto rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
                deleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </Modal>
      }
    />
  );
}
