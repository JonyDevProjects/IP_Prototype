import React, { useState } from 'react';

export const PropertySection = ({ title, children, isOpen = false }: { title: string, children: React.ReactNode, isOpen?: boolean }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-slate-200 dark:border-white/5">
            <button
                className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
                <span className={`material-symbols-outlined text-base transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {open && <div className="p-4 pt-0 space-y-4">{children}</div>}
        </div>
    );
};
