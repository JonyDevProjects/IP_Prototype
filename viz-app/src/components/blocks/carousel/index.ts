import { CarouselView } from './CarouselView';
import { CarouselProperties } from './CarouselProperties';
import type { BlockDefinition } from '../../types';

export const CarouselBlockDefinition: BlockDefinition = {
    type: 'carousel',
    label: 'Carousel',
    icon: 'view_carousel',
    createBlock: (id: string) => ({
        id,
        type: 'carousel',
        content: [
            { id: `slide-1-${Date.now()}`, blocks: [] },
            { id: `slide-2-${Date.now()}`, blocks: [] }
        ],
        metadata: {
            activeIndex: 0
        }
    }),
    Component: CarouselView,
    Properties: CarouselProperties
};
