import { useMemo } from 'react';
import { Upload, X, ImageIcon, Info } from 'lucide-react';
import LabelField from '../../../components/Fieldtemp';

export default function MediaSection({ formData, onChange, errors }) {
  // Derive preview from File object in state
  const mainPreview = useMemo(() => {
    if (formData.mainImage instanceof File) {
      return URL.createObjectURL(formData.mainImage);
    }
    return null;
  }, [formData.mainImage]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <ImageIcon size={16} /> Main Product Image
        </h3>

        <div
          className={`relative group w-64 h-64 border-2 border-dashed rounded-2xl overflow-hidden transition-all flex items-center justify-center
          ${errors.mainImage ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-accent bg-gray-50'}`}
        >
          {mainPreview ? (
            <div className="relative w-full h-full">
              <img
                src={mainPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    target: { name: 'mainImage', value: null, type: 'file' },
                  })
                }
                className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 shadow-lg hover:scale-110 transition-transform"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full p-6 text-center">
              <Upload
                className="text-gray-400 mb-2 group-hover:text-accent transition-colors"
                size={40}
              />
              <span className="text-xs font-bold text-gray-500">
                UPLOAD PHOTO
              </span>
              <input
                type="file"
                name="mainImage"
                className="hidden"
                accept="image/*"
                onChange={onChange}
              />
            </label>
          )}
        </div>
        {errors.mainImage && (
          <p className="text-xs text-red-500 mt-2 font-bold">
            {errors.mainImage}
          </p>
        )}
      </section>

      <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
        <div className="flex gap-2 mb-4 text-blue-800">
          <Info size={20} />
          <h4 className="font-bold">Search Optimization</h4>
        </div>
        <LabelField
          label="Image Alt Text"
          name="imageAlt"
          placeholder="e.g. Front view of Nike shoes"
          value={formData.imageAlt}
          onChange={onChange}
          error={errors.imageAlt}
        />
      </section>
    </div>
  );
}
