import Button from '../../components/Button';
import { Package, Image as ImageIcon, Settings, Save, Trash2 } from 'lucide-react';
import GeneralSection from '../../pages/Product/FormSection/GeneralSection';
import InventorySection from '../../pages/Product/FormSection/InventorySection';
import MediaSection from '../../pages/Product/FormSection/MediaSection';

export default function ProductEditorView({
  product,
  activeTab,
  setActiveTab,
  formData,
  handleChange,
  onSave,
  loading,
  errors,
  onDelete,
  deleting,
}) {
  const tabs = [
    { id: 'general', label: 'General Info', icon: <Package size={18} /> },
    { id: 'inventory', label: 'Pricing & Stock', icon: <Settings size={18} /> },
    { id: 'media', label: 'Media & SEO', icon: <ImageIcon size={18} /> },
  ];

  return (
    <div className="max-w-5xl pb-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            Edit Product
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Update the details of "{product?.productName || 'this product'}"
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            type="button"
            variant="primary"
            onClick={onSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 focus-visible:outline-red-500"
          >
            {deleting ? 'Deleting...' : (
              <>
                <Trash2 size={18} /> Delete
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-primary-light hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <form className="space-y-6" onSubmit={onSave}>
            {activeTab === 'general' && (
              <GeneralSection
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />
            )}
            {activeTab === 'inventory' && (
              <InventorySection
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />
            )}
            {activeTab === 'media' && (
              <MediaSection
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
