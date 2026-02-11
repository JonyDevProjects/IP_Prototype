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
            icon: undefined,
            theme: 'amber',
            detailTitle: 'Step Details',
            detailSubtitle: 'Explain the details here',
            cards: [
                { title: 'Point 1', text: 'Description of point 1', icon: undefined },
                { title: 'Point 2', text: 'Description of point 2', icon: undefined }
            ],
            footerTip: 'Pro tip: Add helpful context here.',
            footerTipIcon: 'help'
        }
    }),
    Component: StepBlockView,
    Properties: StepBlockProperties
};
