export default function GeneralSection() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <label className="block text-sm font-semibold mb-1">Product Name</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. Nike Air Max"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Brand</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2.5"
            placeholder="Brand Name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Categories (Comma separated)
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2.5"
            placeholder="Shoes, Running"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          rows="5"
          className="w-full border rounded-lg p-2.5"
          placeholder="Detailed product description..."
        ></textarea>
      </div>
    </div>
  );
}
