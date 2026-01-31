import React, { useState, useEffect, useRef } from 'react';

interface InlineTextProps {
    value: string;
    onChange: (newValue: string) => void;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    className?: string;
    placeholder?: string;
    multiline?: boolean;
    disabled?: boolean;
}

export const InlineText: React.FC<InlineTextProps> = ({
    value,
    onChange,
    tagName = 'span',
    className = '',
    placeholder = 'Type here...',
    multiline = false,
    disabled = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (editValue !== value) {
            onChange(editValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!multiline || (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                inputRef.current?.blur();
            }
        }
        if (e.key === 'Escape') {
            setEditValue(value);
            setIsEditing(false);
        }
    };

    // If editing, we render an textarea or input based on multiline
    // BUT to keep styles exact, it's often better to render the same tag with contentEditable
    // However, controlled contentEditable in React can be tricky.
    // Let's try a simple approach: Click to swap to an invisible input overlaid? 
    // Or just swap the element to an input/textarea with same classes?

    // Approach: Swap to Input/Textarea with standard styles + transparent bg to blend in
    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as any}
                    className={`${className} outline-none bg-transparent resize-none overflow-hidden m-0 p-0 align-baseline border-b border-[#7f13ec] border-dashed`}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{ minHeight: '1em', height: 'auto' }}
                // Auto-resize logic could go here
                />
            );
        }
        return (
            <input
                ref={inputRef as any}
                className={`${className} outline-none bg-transparent m-0 p-0 align-baseline border-b border-[#7f13ec] border-dashed`}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    }

    const Tag = tagName as any;

    return (
        <Tag
            className={`${className} ${!disabled ? 'cursor-text hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-slate-200 dark:hover:border-white/10' : ''} rounded px-0.5 -mx-0.5 transition-colors`}
            onClick={!disabled ? (e: React.MouseEvent) => {
                e.stopPropagation(); // Prevent block selection
                setIsEditing(true);
            } : undefined}
            title={!disabled ? "Click to edit" : undefined}
        >
            {value || (!disabled && <span className="text-slate-400 italic">{placeholder}</span>)}
        </Tag>
    );
};
