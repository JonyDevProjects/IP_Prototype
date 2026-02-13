import { CarouselView } from './CarouselView';
import { CarouselProperties } from './CarouselProperties';
import type { BlockDefinition, ContentBlock } from '../../types';

export const CarouselBlockDefinition: BlockDefinition = {
    type: 'carousel',
    label: 'Carousel',
    icon: 'view_carousel',
    createBlock: (id: string) => {
        const createSlide = (slideId: string) => ({
            id: slideId,
            blocks: [
                // Default Image
                {
                    id: `${slideId}-image`,
                    type: 'image',
                    content: {
                        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
                        alt: 'Slide Image',
                        caption: ''
                    }
                },
                // Default Text
                {
                    id: `${slideId}-text`,
                    type: 'text',
                    content: '<h3>Slide Title</h3><p>Enter your slide description here.</p>'
                }
            ]
        });

        return {
            id,
            type: 'carousel',
            content: [
                createSlide(`slide-1-${Date.now()}`),
                createSlide(`slide-2-${Date.now()}`)
            ] as unknown as ContentBlock[], // Cast to avoid strict type issues with inferred types vs ContentBlock
            metadata: {
                activeIndex: 0
            }
        };
    },
    Component: CarouselView,
    Properties: CarouselProperties
};
