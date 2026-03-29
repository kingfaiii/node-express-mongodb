import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function MediaSection() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. MAIN PRODUCT IMAGE (The 'Face' of the product) */}
      <section>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Main Image
        </h3>
        <div className="relative group w-full aspect-video md:w-64 md:aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-400 transition-all cursor-pointer">
          {/* If Image exists: */}
          {/* <img src={mainImage} className="w-full h-full object-cover" /> */}

          <div className="text-center p-4">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-xs text-gray-500 font-medium">
              Click to upload main image
            </p>
          </div>
        </div>
      </section>

      {/* 2. IMAGE GALLERY (Secondary views) */}
      <section>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Image Gallery
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Upload Placeholder */}
          <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
            <Upload className="text-gray-400" size={20} />
          </div>

          {/* Example Uploaded Image with Delete Action */}
          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
            <img
              src=""
              alt="Gallery"
              className="w-full h-full object-cover"
            />
            <button className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <X size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. SEO & ALT TEXT */}
      <section className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
        <label className="block text-sm font-semibold text-blue-900 mb-1">
          Image Alt Text (SEO)
        </label>
        <input
          type="text"
          placeholder="e.g. Front view of Nike Air Max in Red"
          className="w-full border-blue-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-blue-700 italic">
          Tip: Descriptive alt text helps your products appear in Google Image
          searches.
        </p>
      </section>
    </div>
  );
}
