export default function Button({ 
  children, 
  onClick = null, 
  type = "button", 
  variant = "primary",
  isLoading = false, 
  disabled = false,
  className = "" 
}) {
  
  const baseStyles = "w-full py-2 rounded-lg font-semibold text-white transition duration-200 focus:outline-none shadow-sm";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-light",
    accent: "bg-accent hover:bg-accent-light",
    muted: "bg-muted cursor-not-allowed",
  };

  const isDisabled = isLoading || disabled;
  const stateStyles = isDisabled ? "opacity-70 cursor-not-allowed bg-muted" : variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${stateStyles} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          {/* You can add a simple CSS spinner here later */}
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}