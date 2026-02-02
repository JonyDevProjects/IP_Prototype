import React from 'react';

interface ToolButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    label?: string;
    isActive?: boolean;
}

export const ToolButton = ({ icon, label, isActive = false, ...props }: ToolButtonProps) => (
    <button
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group relative ${isActive ? 'text-[#7f13ec] bg-[#7f13ec]/10 border border-[#7f13ec]/20' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#7f13ec]'} ${props.draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${props.className || ''}`}
        {...props}
    >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        {label && (
            <span className="absolute left-12 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {label}
            </span>
        )}
    </button>
);
