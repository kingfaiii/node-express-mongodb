import LabelField from '../../../components/Fieldtemp';

export default function InventorySection() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <LabelField
            label="Price ($)"
            name="price"
            id="price"
            placeholder="0.00"
          />
        </div>
        <div>
          <LabelField
            label="Stock"
            type="number"
            name="inventoryStock"
            id="inventoryStock"
            placeholder="0"
          />
        </div>
        <div>
          <LabelField
            type="text"
            placeholder="SKU"
            label="SKU"
            name="sku"
            id="sku"
          />
        </div>
      </div>
    </div>
  );
}
