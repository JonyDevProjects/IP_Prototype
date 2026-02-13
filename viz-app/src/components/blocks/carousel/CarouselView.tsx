import React, { useState, useEffect } from 'react';
import type { ContentBlock } from '../../../types/course';
import { getBlockDefinition } from '../registry';
import { useCarouselTTS } from './hooks/useCarouselTTS';

interface CarouselViewProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
    isEditable?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    playMode?: 'auto' | 'manual';
    isActiveBlock?: boolean;
    onTTSComplete?: () => void;
    rate?: number;
    volume?: number;
}

export const CarouselView: React.FC<CarouselViewProps> = ({
    block,
    onUpdate,
    isEditable = true,
    onClick,
    playMode,
    isActiveBlock,
    onTTSComplete,
    rate,
    volume
}) => {
    // Narrow type
    if (block.type !== 'carousel') return <div>Invalid Block Type</div>;

    // Use metadata for active index (source of truth)
    const activeIndex = block.metadata?.activeIndex ?? 0;
    const [selectedNestedBlockId, setSelectedNestedBlockId] = useState<string | null>(null);

    const slides = block.content || [];
    const activeSlide = slides[activeIndex] || { id: 'default', blocks: [] };

    // TTS Integration
    const handleTTSComplete = () => {
        if (activeIndex < slides.length - 1) {
            onUpdate({ metadata: { ...block.metadata, activeIndex: activeIndex + 1 } });
        } else {
            if (onTTSComplete) onTTSComplete();
        }
    };

    const { activeReadingId } = useCarouselTTS({
        blocks: activeSlide.blocks,
        autoPlay: playMode === 'auto',
        isActive: isActiveBlock,
        onComplete: handleTTSComplete,
        rate,
        volume
    });

    // Initial state handling (ensure metadata is set if missing)
    useEffect(() => {
        if (block.metadata?.activeIndex === undefined) {
            onUpdate({ metadata: { ...block.metadata, activeIndex: 0 } });
        }
    }, [block.id, block.metadata?.activeIndex]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextIndex = (activeIndex + 1) % slides.length;
        onUpdate({ metadata: { ...block.metadata, activeIndex: nextIndex } });
        setSelectedNestedBlockId(null);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
        onUpdate({ metadata: { ...block.metadata, activeIndex: prevIndex } });
        setSelectedNestedBlockId(null);
    };

    const updateNestedBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        const newSlides = [...slides];
        const slide = { ...newSlides[activeIndex] };
        slide.blocks = slide.blocks.map(b => b.id === blockId ? { ...b, ...updates } as ContentBlock : b);
        newSlides[activeIndex] = slide;
        onUpdate({ content: newSlides });
    };

    const containerClasses = "w-full min-h-[300px] relative flex flex-col items-center justify-center p-8";

    return (
        <div
            className={containerClasses}
            onClick={(e) => {
                // Select the carousel block itself
                if (onClick) onClick(e);
                // Clear nested selection when clicking active area
                setSelectedNestedBlockId(null);
            }}
        >
            {/* Controls */}
            {slides.length > 1 && (
                <>
                    <button onClick={handlePrev} className="absolute left-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-slate-50">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button onClick={handleNext} className="absolute right-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-slate-50">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </>
            )}

            {/* Content Area */}
            <div className="w-full max-w-2xl min-h-[200px] bg-white dark:bg-black rounded-lg shadow-sm p-6">
                {activeSlide.blocks.length === 0 ? (
                    null
                ) : (
                    <div className="flex flex-col gap-4">
                        {activeSlide.blocks.map(nestedBlock => {
                            const Def = getBlockDefinition(nestedBlock.type);
                            if (!Def) return null;

                            const isSelected = selectedNestedBlockId === nestedBlock.id;
                            const isReading = activeReadingId === nestedBlock.id;

                            return (
                                <div
                                    key={nestedBlock.id}
                                    className={`relative group ${isSelected ? 'ring-2 ring-blue-500 rounded' : ''} ${isReading ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        // Only allow selection in edit mode
                                        if (isEditable) {
                                            setSelectedNestedBlockId(nestedBlock.id);
                                        }

                                        // Also trigger parent selection so sidebar opens
                                        if (onClick) onClick(e);

                                        // Update metadata to let Sidebar know which nested block is active
                                        onUpdate({
                                            metadata: {
                                                ...block.metadata,
                                                activeNestedBlockId: nestedBlock.id
                                            }
                                        });
                                    }}
                                >
                                    {/* Render Nested Block */}
                                    <Def.Component
                                        block={nestedBlock}
                                        onUpdate={(u) => updateNestedBlock(nestedBlock.id, u)}
                                        isEditable={isEditable} // Nested blocks are editable
                                        isSelected={isSelected}
                                        onClick={() => { }} // Click handled by wrapper
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-4 flex gap-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-blue-600' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};
