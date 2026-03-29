import { useState } from 'react';
import Button from '../../components/Button';
import { Package, Image as ImageIcon, Settings, Save } from 'lucide-react';
import GeneralSection from './FormSection/GeneralSection';
import InventorySection from './FormSection/InventorySection';
export default function AddProduct() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Info', icon: <Package size={18} /> },
    { id: 'inventory', label: 'Pricing & Stock', icon: <Settings size={18} /> },
    { id: 'media', label: 'Media & SEO', icon: <ImageIcon size={18} /> },
  ];

  return (
    <div className="max-w-5xl pb-20">
      {/* Header with Breadcrumbs & Action */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-500 text-sm">
            Create a new listing in your store
          </p>
        </div>  
        <Button variant="primary" className="flex items-center gap-2 px-6">
          <Save size={18} /> Save Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </aside>

        {/* Form Content Area */}
        <main className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <form className="space-y-6">
            {activeTab === 'general' && <GeneralSection />}
            {activeTab === 'inventory' && <InventorySection />}
            {activeTab === 'media' && <MediaSection />}
          </form>
        </main>
      </div>
    </div>
  );
}
