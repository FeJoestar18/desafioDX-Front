import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmModal({ 
  isOpen, 
  onCancel, 
  onConfirm, 
  title, 
  description, 
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  isLoading 
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-[2px] p-4">
      <div 
        className="bg-surface rounded-xl shadow-xl w-full max-w-[420px] overflow-hidden border border-border"
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center shrink-0 mt-1">
              <AlertTriangle className="w-5 h-5 text-danger" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-text-primary">{title}</h3>
              <p className="text-[14px] text-text-secondary mt-1 leading-relaxed">{description}</p>
            </div>
            <button 
              onClick={onCancel} 
              className="text-text-secondary hover:text-text-primary transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="bg-[#F8FAFC] px-6 py-4 flex items-center justify-end gap-3 border-t border-border">
          <Button variant="ghost" onClick={onCancel} disabled={isLoading} className="!py-2 !px-4">
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading} className="!py-2 !px-4">
            {isLoading ? 'Excluindo...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}