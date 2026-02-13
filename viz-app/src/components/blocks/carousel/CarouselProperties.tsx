import type { ContentBlock } from '../../../types/course';
import { PropertySection } from '../../ui/PropertySection';


interface CarouselPropertiesProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}

import { RichTextEditor } from '../../ui/RichTextEditor';

interface CarouselPropertiesProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}

export const CarouselProperties: React.FC<CarouselPropertiesProps> = ({ block, onUpdate }) => {
    if (block.type !== 'carousel') return null;

    const activeIndex = block.metadata?.activeIndex ?? 0;
    const slides = block.content || [];
    const activeSlide = slides[activeIndex];

    // Helper to update a specific nested block in the active slide
    const updateNestedBlock = (blockType: 'image' | 'text', content: string | { src: string; alt?: string }) => {
        if (!activeSlide) return;

        const newSlides = [...slides];
        const slideIndex = activeIndex;
        const slide = { ...newSlides[slideIndex] };

        // Find the target block
        const targetBlockIndex = slide.blocks.findIndex(b => b.type === blockType);

        if (targetBlockIndex !== -1) {
            // Update existing block
            const updatedBlock = { ...slide.blocks[targetBlockIndex], content } as ContentBlock;
            const newBlocks = [...slide.blocks];
            newBlocks[targetBlockIndex] = updatedBlock as ContentBlock;
            slide.blocks = newBlocks;
        } else {
            // Create if missing (fallback for old blocks)
            const newBlock: ContentBlock = blockType === 'image'
                ? { id: `${slide.id}-image`, type: 'image', content: content as string | { src: string; alt?: string } } as unknown as ContentBlock
                : { id: `${slide.id}-text`, type: 'text', content: content as string } as ContentBlock;
            slide.blocks = [...slide.blocks, newBlock];
        }

        newSlides[slideIndex] = slide;
        onUpdate({ content: newSlides });
    };

    // Get current values
    const imageBlock = activeSlide?.blocks.find(b => b.type === 'image');
    const textBlock = activeSlide?.blocks.find(b => b.type === 'text');

    const imageUrl = imageBlock ? (typeof imageBlock.content === 'object' ? (imageBlock.content as { src: string }).src : imageBlock.content as string) : '';
    const textContent = textBlock ? (textBlock.content as string) : '';

    return (
        <>
            <PropertySection title="Carousel Management" isOpen>
                <div className="space-y-4">
                    {/* Slide Selector for Editing */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase">Select Slide to Edit</label>
                        <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${activeIndex === i
                                        ? 'bg-white dark:bg-white/10 shadow-sm text-[#7f13ec]'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                                        }`}
                                    onClick={() => onUpdate({ metadata: { ...block.metadata, activeIndex: i } })}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-2 py-1.5 text-xs font-bold rounded text-white bg-[#7f13ec] hover:bg-[#690fc4] transition-colors flex items-center justify-center"
                                onClick={() => {
                                    // Default new slide structure
                                    const slideId = `slide-${Date.now()}`;
                                    const newSlide = {
                                        id: slideId,
                                        blocks: [
                                            {
                                                id: `${slideId}-image`,
                                                type: 'image',
                                                content: {
                                                    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
                                                    alt: 'New Slide Image',
                                                    caption: ''
                                                }
                                            } as ContentBlock,
                                            {
                                                id: `${slideId}-text`,
                                                type: 'text',
                                                content: '<h3>New Slide</h3><p>Description...</p>'
                                            } as ContentBlock
                                        ]
                                    };
                                    onUpdate({
                                        content: [...slides, newSlide],
                                        metadata: { ...block.metadata, activeIndex: slides.length }
                                    });
                                }}
                                title="Add Slide"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>

                        {slides.length > 1 && (
                            <div className="mt-2 text-right">
                                <button
                                    className="text-[10px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 ml-auto"
                                    onClick={() => {
                                        const newSlides = slides.filter((_, i) => i !== activeIndex);
                                        const newActive = activeIndex >= newSlides.length ? Math.max(0, newSlides.length - 1) : activeIndex;
                                        onUpdate({ content: newSlides, metadata: { ...block.metadata, activeIndex: newActive } });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[12px]">delete</span>
                                    Delete Slide
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </PropertySection>

            {activeSlide && (
                <PropertySection title="Active Slide Content" isOpen>
                    <div className="space-y-4">
                        {/* Image Input */}
                        <div>
                            <label className="block text-xs text-slate-500 mb-1.5">Slide Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={imageUrl}
                                    onChange={(e) => updateNestedBlock('image', { src: e.target.value, alt: 'Slide Image' })}
                                    placeholder="https://..."
                                />
                                <button className="p-2 bg-slate-100 dark:bg-white/5 rounded border border-slate-200 dark:border-white/10 text-slate-500 hover:text-[#7f13ec]">
                                    <span className="material-symbols-outlined text-lg">image</span>
                                </button>
                            </div>
                        </div>

                        {/* Text Input with Toggle */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs text-slate-500">Slide Description</label>
                                <div
                                    className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${textContent ? 'bg-[#7f13ec]' : 'bg-slate-300 dark:bg-slate-600'}`}
                                    onClick={() => {
                                        if (textBlock) {
                                            // Remove text block
                                            const newBlocks = activeSlide.blocks.filter(b => b.type !== 'text');
                                            const newSlide = { ...activeSlide, blocks: newBlocks };
                                            const newSlides = [...slides];
                                            newSlides[activeIndex] = newSlide;
                                            onUpdate({ content: newSlides });
                                        } else {
                                            // Add text block
                                            const newBlock: ContentBlock = {
                                                id: `${activeSlide.id}-text`,
                                                type: 'text',
                                                content: '<p>Description...</p>'
                                            } as ContentBlock;
                                            const newSlide = { ...activeSlide, blocks: [...activeSlide.blocks, newBlock] };
                                            const newSlides = [...slides];
                                            newSlides[activeIndex] = newSlide;
                                            onUpdate({ content: newSlides });
                                        }
                                    }}
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${textContent ? 'translate-x-4' : ''}`} />
                                </div>
                            </div>

                            {/* Only show editor if text block exists */}
                            {textBlock && (
                                <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-slate-50 dark:bg-white/5 p-2">
                                    <RichTextEditor
                                        content={textContent}
                                        onChange={(html) => updateNestedBlock('text', html)}
                                        className="text-xs min-h-[100px]"
                                        forceToolbar
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </PropertySection>
            )}
        </>
    );
};
