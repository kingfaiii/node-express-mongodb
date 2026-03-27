import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-primary hover:text-primary-light"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl text-primary font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
