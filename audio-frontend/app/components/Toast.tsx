import { ToastState } from '../types/ui';

export default function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`max-w-xs rounded-lg px-4 py-3 text-xs shadow-lg border ${
          toast.type === 'success'
            ? 'bg-emerald-500/90 border-emerald-300 text-emerald-950'
            : 'bg-red-500/90 border-red-300 text-red-950'
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
}
