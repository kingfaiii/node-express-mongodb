export default function LabelField({
  label,
  error,
  icon: Icon,
  name,
  id,
  ...props
}) {
  // Fallback to name if id isn't provided to ensure they stay linked
  const fieldId = id || name;

  return (
    <div className="space-y-1">
      <label
        htmlFor={fieldId} // Links to the input ID
        className="text-sm font-semibold text-primary/80 ml-1 cursor-pointer"
      >
        {label}
      </label>

      <div className="relative group">
        {Icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors 
            ${error ? 'text-red-400' : 'text-muted group-focus-within:text-primary'}`}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          {...props}
          id={fieldId} // Required for the label 'for' attribute
          name={name} // Required for browser autofill and form submission
          className={`w-full py-2.5 rounded-lg border bg-surface transition-all outline-none focus:ring-2
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${
              error
                ? 'border-red-500 focus:ring-red-100'
                : 'border-primary-light focus:ring-accent/30 focus:border-accent'
            }`}
        />
      </div>

      {error && (
        <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
