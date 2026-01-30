import React from 'react';
import type { ContentBlock } from '../../../types/course';

interface EditorBlockWrapperProps {
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}

export const EditorBlockWrapper = ({ block, isSelected, onClick, children }: EditorBlockWrapperProps) => {
    return (
        <div
            className={`relative rounded-lg transition-all ${isSelected ? 'z-10' : ''}`}
            onClick={onClick}
        >
            {/* Type Indicator */}
            {isSelected && (
                <div className="absolute -top-3 -right-3 flex gap-1 z-20">
                    <div className="bg-[#7f13ec] text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm uppercase font-bold tracking-wide">
                        {block.type}
                    </div>
                </div>
            )}

            {children}

            {/* Resize Handles (Visual Only) - could be extracted or managed globally */}
            {isSelected && (
                <div className="absolute inset-0 pointer-events-none border-2 border-[#7f13ec] rounded-lg">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#7f13ec] rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#7f13ec] rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#7f13ec] rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#7f13ec] rounded-full"></div>
                </div>
            )}
        </div>
    );
};
