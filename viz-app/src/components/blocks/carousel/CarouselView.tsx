import React, { useState, useRef, useEffect } from 'react';
import type { ContentBlock, CarouselBlock, CarouselSlide } from '../../../types/course';
import { getBlockDefinition } from '../registry';

interface CarouselViewProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
    isEditable?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export const CarouselView: React.FC<CarouselViewProps> = ({ block, onUpdate, isEditable = true, onClick }) => {
    // Narrow type
    if (block.type !== 'carousel') return <div>Invalid Block Type</div>;

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedNestedBlockId, setSelectedNestedBlockId] = useState<string | null>(null);

    // Initial state handling (from skill guidelines)
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Force reset to first slide or no selection if needed, 
            // but for carousel activeIndex=0 is usually desired as default view.
            // However, we ensure nested selection is cleared.
            setSelectedNestedBlockId(null);
            return;
        }
    }, [block.id]);


    const slides = block.content || [];
    const activeSlide = slides[activeIndex] || { id: 'default', blocks: [] };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev + 1) % slides.length);
        setSelectedNestedBlockId(null);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setSelectedNestedBlockId(null);
    };

    // D&D Handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEditable) {
            e.dataTransfer.dropEffect = 'copy';
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isEditable) return;

        const blockType = e.dataTransfer.getData('blockType');
        if (blockType) {
            const def = getBlockDefinition(blockType);
            if (def) {
                const newBlock = def.createBlock(`nested-${Date.now()}`);

                // Add to current slide
                const newSlides = [...slides];
                if (!newSlides[activeIndex]) {
                    newSlides[activeIndex] = { id: `slide-${Date.now()}`, blocks: [] };
                }

                newSlides[activeIndex] = {
                    ...newSlides[activeIndex],
                    blocks: [...newSlides[activeIndex].blocks, newBlock]
                };

                onUpdate({ content: newSlides });
            }
        }
    };

    const updateNestedBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        const newSlides = [...slides];
        const slide = { ...newSlides[activeIndex] };
        slide.blocks = slide.blocks.map(b => b.id === blockId ? { ...b, ...updates } as ContentBlock : b);
        newSlides[activeIndex] = slide;
        onUpdate({ content: newSlides });
    };

    const deleteNestedBlock = (blockId: string) => {
        const newSlides = [...slides];
        const slide = { ...newSlides[activeIndex] };
        slide.blocks = slide.blocks.filter(b => b.id !== blockId);
        newSlides[activeIndex] = slide;
        onUpdate({ content: newSlides });
    }

    return (
        <div
            className="w-full min-h-[300px] bg-slate-100 dark:bg-slate-900 rounded-xl relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 transition-colors p-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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
                    <div className="text-center text-slate-400 py-12">
                        Drop blocks here (Text, Image)
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {activeSlide.blocks.map(nestedBlock => {
                            const Def = getBlockDefinition(nestedBlock.type);
                            if (!Def) return null;

                            const isSelected = selectedNestedBlockId === nestedBlock.id;

                            return (
                                <div
                                    key={nestedBlock.id}
                                    className={`relative group ${isSelected ? 'ring-2 ring-blue-500 rounded' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedNestedBlockId(nestedBlock.id);
                                        // Also trigger parent selection so sidebar opens
                                        if (onClick) onClick(e);

                                        // Update metadata to let Sidebar know which nested block is active
                                        // We'll store it in a special transient metadata field or just handle updates here?
                                        // Strategy: The Sidebar for Carousel will read `selectedNestedBlockId` from *internal* state if we lift it,
                                        // OR we sync it to metadata. Syncing to metadata is more robust for the Sidebar component to read.
                                        onUpdate({
                                            metadata: {
                                                ...block.metadata,
                                                activeNestedBlockId: nestedBlock.id
                                            }
                                        });
                                    }}
                                >
                                    {/* Render Nested Block in "View" mode mostly, but fully interactive */}
                                    <Def.Component
                                        block={nestedBlock}
                                        onUpdate={(u) => updateNestedBlock(nestedBlock.id, u)}
                                        isEditable={isEditable} // Nested blocks are editable
                                        isSelected={isSelected}
                                    />

                                    {/* Simple Delete for nested (since wrapper isn't fully there) */}
                                    {isEditable && isSelected && (
                                        <button
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNestedBlock(nestedBlock.id);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[10px]">close</span>
                                        </button>
                                    )}
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
