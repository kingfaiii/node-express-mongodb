import LabelField from '../../../components/Fieldtemp';
import { DollarSign, Hash, Barcode, CheckCircle, Star } from 'lucide-react';

export default function InventorySection({ formData, onChange, errors }) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <LabelField
            label="Price ($)"
            name="price"
            id="price"
            icon={DollarSign}
            onChange={onChange}
            value={formData.price}
            error={errors.price}
            placeholder="0.00"
          />
        </div>
        <div>
          <LabelField
            label="Stock"
            type="number"
            name="inventoryStock"
            id="inventoryStock"
            icon={Hash}
            onChange={onChange}
            value={formData.inventoryStock}
            error={errors.inventoryStock}
            placeholder="0"
          />
        </div>
        <div>
          <LabelField
            type="text"
            placeholder="e.g. NK-12345"
            label="SKU"
            name="sku"
            id="sku"
            icon={Barcode}
            onChange={onChange}
            value={formData.sku}
            error={errors.sku}
          />
        </div>
      </div>
    </div>
  );
}
