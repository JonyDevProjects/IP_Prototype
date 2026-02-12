import type { ContentBlock } from '../../../types/course';
import { PropertySection } from '../../ui/PropertySection';
import { getBlockDefinition } from '../registry';

interface CarouselPropertiesProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}

export const CarouselProperties: React.FC<CarouselPropertiesProps> = ({ block, onUpdate }) => {
    if (block.type !== 'carousel') return null;

    const activeIndex = block.metadata?.activeIndex ?? 0;
    const slides = block.content || [];
    const activeSlide = slides[activeIndex];

    // Check if a nested block is selected via metadata
    // We stored this in `activeNestedBlockId` in the View click handler
    const activeNestedBlockId = block.metadata?.activeNestedBlockId as string | undefined;
    const activeNestedBlock = activeSlide?.blocks.find(b => b.id === activeNestedBlockId);

    // PROXY MODE: If a nested block is selected, render its specific properties instead!
    if (activeNestedBlock) {
        const NestedDef = getBlockDefinition(activeNestedBlock.type);
        if (NestedDef && NestedDef.Properties) {
            return (
                <div>
                    <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Editing {NestedDef.label}
                        </span>
                        <button
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            onClick={() => onUpdate({ metadata: { ...block.metadata, activeNestedBlockId: undefined } })}
                        >
                            Back to Carousel
                        </button>
                    </div>

                    <NestedDef.Properties
                        block={activeNestedBlock}
                        onUpdate={(nestedUpdates) => {
                            // Deep update logic
                            const newSlides = [...slides];
                            const slide = { ...newSlides[activeIndex] };
                            slide.blocks = slide.blocks.map(b =>
                                b.id === activeNestedBlockId ? { ...b, ...nestedUpdates } as ContentBlock : b
                            );
                            newSlides[activeIndex] = slide;
                            onUpdate({ content: newSlides });
                        }}
                    />
                </div>
            )
        }
    }

    // DEFAULT MODE: Manage Carousel Slides
    return (
        <PropertySection title="Carousel Slides" isOpen>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className={`p-2 rounded border flex items-center justify-between cursor-pointer ${idx === activeIndex ? 'bg-blue-50 border-blue-400' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                            onClick={() => onUpdate({ metadata: { ...block.metadata, activeIndex: idx, activeNestedBlockId: undefined } })}
                        >
                            <span className="text-sm font-medium">Slide {idx + 1}</span>
                            {slides.length > 1 && (
                                <button
                                    className="p-1 hover:bg-red-100 rounded text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newSlides = slides.filter((_, i) => i !== idx);
                                        // Adjust active index if needed
                                        const newActive = idx >= newSlides.length ? Math.max(0, newSlides.length - 1) : idx;
                                        onUpdate({ content: newSlides, metadata: { ...block.metadata, activeIndex: newActive } });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 mt-2"
                        onClick={() => {
                            const newSlide = { id: `slide-${Date.now()}`, blocks: [] };
                            onUpdate({
                                content: [...slides, newSlide],
                                metadata: { ...block.metadata, activeIndex: slides.length, activeNestedBlockId: undefined }
                            });
                        }}
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add Slide
                    </button>
                </div>
            </div>
        </PropertySection>
    );
};
