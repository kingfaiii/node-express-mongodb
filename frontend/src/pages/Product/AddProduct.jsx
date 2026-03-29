import { useState } from 'react';
import Button from '../../components/Button';
import { Package, Image as ImageIcon, Settings, Save } from 'lucide-react';
import GeneralSection from './FormSection/GeneralSection';
import InventorySection from './FormSection/InventorySection';
import MediaSection from './FormSection/MediaSection';
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Add New Product</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Create a new listing in your store
          </p>
        </div>  
        <Button variant="primary" className="flex items-center justify-center gap-2 px-6 py-3 w-full md:w-auto">
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
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-primary-light hover:bg-gray-50 border border-gray-100'
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
