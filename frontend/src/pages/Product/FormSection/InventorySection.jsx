export default function InventorySection() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Price ($)</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2.5"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Stock</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2.5"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">SKU</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2.5"
            placeholder="NK-12345"
          />
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-xs text-gray-500 mb-2 uppercase font-bold">
          Options
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
            <span className="text-sm">Featured Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-blue-600"
            />
            <span className="text-sm">Active Listing</span>
          </label>
        </div>
      </div>
    </div>
  );
}
