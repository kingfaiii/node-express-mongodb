export default function LabelField({ children, value, onChange, required = false, type="text" }) {
  const baseStyle =
    'w-full px-4 py-2 border rounded-lg focus:outline-none transition border-primary-light bg-surface focus:border-accent';
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-primary">
        {children}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={baseStyle}
      />
    </div>
  );
}
