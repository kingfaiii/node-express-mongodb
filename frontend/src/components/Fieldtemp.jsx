import { Mail, Lock, User } from 'lucide-react';

export default function LabelField({ label, type, icon: Icon, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-primary/80 ml-1">{label}</label>
      <div className="relative group">
        {/* 3. DYNAMIC ICON: We pass the Lucide component as a prop */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          type={type}
          className={`w-full py-2.5 rounded-lg border border-primary-light bg-surface focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all
            ${Icon ? 'pl-10 pr-4' : 'px-4'}`} // Adjust padding if icon exists
        />
      </div>
    </div>
  );
}