import type { BlockDefinition } from '../types';
import { StepBlockView } from './StepBlockView';
import { StepBlockProperties } from './StepBlockProperties';

export const StepBlockDefinition: BlockDefinition = {
    type: 'step',
    label: 'Single Step',
    icon: 'check_circle', // Or 'article', 'info'
    createBlock: (id: string) => ({
        id,
        type: 'step',
        content: {
            title: 'New Step',
            icon: 'lightbulb',
            theme: 'amber',
            detailTitle: 'Step Details',
            detailSubtitle: 'Explain the details here',
            detailIcon: 'lightbulb',
            cards: [
                { title: 'Point 1', text: 'Description of point 1', icon: 'check_circle' },
                { title: 'Point 2', text: 'Description of point 2', icon: 'check_circle' }
            ],
            footerTip: 'Pro tip: Add helpful context here.',
            footerTipIcon: 'help'
        }
    }),
    Component: StepBlockView,
    Properties: StepBlockProperties
};
