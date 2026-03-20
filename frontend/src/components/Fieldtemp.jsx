import { Mail, Lock, User } from 'lucide-react';

export default function LabelField({ label, error, icon: Icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-primary/80 ml-1">
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
          className={`w-full py-2.5 rounded-lg border bg-surface transition-all
            ${Icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-red-500 focus:ring-red-100' : 'border-primary-light focus:ring-accent/30 focus:border-accent'}`}
        />
      </div>

      {/* THE FEEDBACK: Show the field-specific error */}
      {error && (
        <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
