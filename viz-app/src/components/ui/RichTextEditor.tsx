import React, { useState, useEffect, useRef } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
    forceToolbar?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    content,
    onChange,
    readOnly = false,
    placeholder = 'Type here...',
    className = '',
    forceToolbar = false
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [toolbarVisible, setToolbarVisible] = useState(false);
    const [activeFormats, setActiveFormats] = useState<string[]>([]);
    const [currentBlockType, setCurrentBlockType] = useState('p');

    // Sync content updates from parent if strictly needed (controlled)
    // Warning: Directly updating innerHTML on every render with cursor inside is tricky.
    // We only update if the editor is NOT focused or empty to avoid jumping cursor.
    useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML && document.activeElement !== editorRef.current) {
            editorRef.current.innerHTML = content;
        }
        // If content is empty string, clear the editor
        if (content === '' && editorRef.current) {
            editorRef.current.innerHTML = '';
        }
    }, [content]);

    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        checkFormats();
        editorRef.current?.focus();
    };

    const checkFormats = () => {
        if (!editorRef.current) return;

        // Check standard formats
        const formats = [];
        if (document.queryCommandState('bold')) formats.push('bold');
        if (document.queryCommandState('italic')) formats.push('italic');
        if (document.queryCommandState('insertUnorderedList')) formats.push('ul');
        if (document.queryCommandState('insertOrderedList')) formats.push('ol');
        setActiveFormats(formats);

        // Check Block Type
        const block = document.queryCommandValue('formatBlock');
        setCurrentBlockType(block || 'p');
    };

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html === '<br>' ? '' : html); // Clean empty breaks
            checkFormats();
        }
    };

    return (
        <div
            className={`relative group ${className}`}
            onFocus={() => setToolbarVisible(true)}
            onBlur={(e) => {
                // Hide toolbar only if moving focus outside the component
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setToolbarVisible(false);
                }
            }}
        >
            {/* Toolbar - Appears above or fixed if forced */}
            {!readOnly && (
                <div className={`
                    z-50 flex items-center gap-1 p-1.5 rounded-xl transition-all duration-200 origin-bottom flex-wrap
                    bg-white dark:bg-[#1e1e24] shadow-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white
                    ${forceToolbar
                        ? 'sticky top-0 mb-2 w-full justify-start relative bg-slate-50 dark:bg-white/5 border-b border-t-0 border-x-0 rounded-none'
                        : `absolute -top-14 left-0 ${toolbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`
                    }
                `}>

                    {/* Block Type Dropdown (Simplified as cyclic button or distinct icons for now) */}
                    <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-0.5 mr-2">
                        <ToolbarButton
                            active={currentBlockType === 'p'}
                            onClick={() => handleFormat('formatBlock', 'p')}
                            label="P"
                            tooltip="Paragraph"
                        />
                        <ToolbarButton
                            active={currentBlockType === 'h1'}
                            onClick={() => handleFormat('formatBlock', 'h1')}
                            label="H1"
                            tooltip="Heading 1"
                        />
                        <ToolbarButton
                            active={currentBlockType === 'h2'}
                            onClick={() => handleFormat('formatBlock', 'h2')}
                            label="H2"
                            tooltip="Heading 2"
                        />
                        <ToolbarButton
                            active={currentBlockType === 'h3'}
                            onClick={() => handleFormat('formatBlock', 'h3')}
                            label="H3"
                            tooltip="Heading 3"
                        />
                    </div>

                    <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1" />

                    <ToolbarButton
                        icon="format_bold"
                        active={activeFormats.includes('bold')}
                        onClick={() => handleFormat('bold')}
                        tooltip="Bold"
                    />
                    <ToolbarButton
                        icon="format_italic"
                        active={activeFormats.includes('italic')}
                        onClick={() => handleFormat('italic')}
                        tooltip="Italic"
                    />

                    <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1" />

                    <ToolbarButton
                        icon="format_list_bulleted"
                        active={activeFormats.includes('ul')}
                        onClick={() => handleFormat('insertUnorderedList')}
                        tooltip="Bullet List"
                    />
                    <ToolbarButton
                        icon="format_list_numbered"
                        active={activeFormats.includes('ol')}
                        onClick={() => handleFormat('insertOrderedList')}
                        tooltip="Numbered List"
                    />

                </div>
            )}

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable={!readOnly}
                className={`outline-none min-h-[1em] prose dark:prose-invert max-w-none break-words
                    ${content ? '' : 'before:content-[attr(data-placeholder)] before:text-slate-400 before:absolute'} 
                    /* Custom Prose Tweaks via arbitrary values if plugin defaults aren't enough */
                    prose-p:my-2 prose-p:leading-relaxed
                    prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                    prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-6
                    prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5
                    prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
                    prose-ul:my-2 prose-li:my-0.5
                    prose-pre:bg-slate-900 prose-pre:p-4 prose-pre:rounded-lg
                `}
                onInput={handleInput}
                onMouseUp={checkFormats}
                onTouchEnd={checkFormats}
                onKeyUp={(e) => {
                    checkFormats();
                    if (e.key === 'Backspace' && editorRef.current?.innerHTML === '<br>') {
                        editorRef.current.innerHTML = ''; // Force Clean
                    }
                }}
                data-placeholder={placeholder}
            />
        </div>
    );
};

// Helper Subcomponent for Toolbar Buttons
const ToolbarButton: React.FC<{
    icon?: string;
    label?: string;
    active?: boolean;
    onClick: () => void;
    tooltip: string;
}> = ({ icon, label, active, onClick, tooltip }) => (
    <button
        className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${active
            ? 'bg-[#7f13ec] text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10'
            }`}
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        }}
        title={tooltip}
    >
        {icon ? <span className="material-symbols-outlined text-[18px]">{icon}</span> : <span className="text-xs font-bold font-mono">{label}</span>}
    </button>
);
