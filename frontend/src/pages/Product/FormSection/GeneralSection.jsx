import LabelField from '../../../components/Fieldtemp';
import { Package, Tag, Layers, FileText } from 'lucide-react';
export default function GeneralSection({ formData, onChange, errors }) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <LabelField
          label="Product Name"
          type="text"
          icon={Package}
          onChange={onChange}
          value={formData.productName}
          error={errors.productName}
          name="productName"
          id="productName"
          placeholder="e.g. Nike Air Max"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <LabelField
            label="Brand"
            type="text"
            icon={Tag}
            onChange={onChange}
            value={formData.brand}
            error={errors.brand}
            name="brand"
            id="brand"
            placeholder="Brand Name"
          />
        </div>
        <div>
          <LabelField
            label="Categories (Comma separated)"
            type="text"
            className="w-full border rounded-lg p-2.5"
            icon={Layers}
            onChange={onChange}
            value={formData.productCategories}
            error={errors.productCategories}
            name="productCategories"
            id="productCategories"
          />
        </div>
      </div>
      <div>
        <LabelField
          label="Description"
          type="textarea"
          icon={FileText}
          onChange={onChange}
          value={formData.productDescription}
          error={errors.productDescription}
          name="productDescription"
          id="productDescription"
          placeholder="Detailed product description..."
        />
      </div>
    </div>
  );
}
