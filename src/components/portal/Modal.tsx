import React from "react";
import { X } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidth?: string;
};

export default function Modal({
  eyebrow,
  title,
  onClose,
  children,
  maxWidth = "max-w-md",
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} relative overflow-hidden`}>
        <div className="bg-linear-to-r from-[#BF9B63] to-[#d4b07a] px-6 py-4 flex items-center justify-between">
          <div>
            {eyebrow && (
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                {eyebrow}
              </p>
            )}
            <h3 className="text-white font-bold text-base font-lex">{title}</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
