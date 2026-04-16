import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useUpdateProduct } from '../../features/products/useUpdate';
import { useProduct } from '../../features/products/useProduct';
import ProductEditorView from '../../features/products/ProductEditorView';

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  const { product, loading: fetchLoading, error: fetchError, deleteProduct, deleting } = useProduct(id);
  const { formData, handleChange, updateProduct, loading: saving, errors } = useUpdateProduct(product);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500">Loading product details...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">Error loading product: {fetchError.message || 'Unable to load data.'}</div>
      </div>
    );
  }

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    const deleted = await deleteProduct(id);
    if (deleted) {
      closeDeleteModal();
      navigate('/dashboard/products');
    }
  };

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Delete"
      >
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to permanently delete "{product?.productName || 'this product'}"? This action cannot be undone.
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
            onClick={handleDelete}
            disabled={deleting}
            className={`w-full sm:w-auto rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
              deleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Modal>

      <ProductEditorView
      product={product}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      formData={formData}
      handleChange={handleChange}
      onSave={(e) => updateProduct(e, id)}
      loading={saving}
      errors={errors}
      onDelete={openDeleteModal}
      deleting={deleting}
    />
    </>
  );
}
