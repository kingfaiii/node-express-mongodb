import LabelField from "../../../components/Fieldtemp";

export default function GeneralSection() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <LabelField
          label="Product Name"
          type="text"
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
            placeholder="Shoes, Running"
            name="productCategories"
            id="productCategories"
          />
        </div>
      </div>
      <div>
        <LabelField
          label="Description"
          type="textarea"
          name="productDescription"
          id="productDescription"
          placeholder="Detailed product description..."
        />
      </div>
    </div>
  );
}
