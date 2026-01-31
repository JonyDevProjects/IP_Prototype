
import type { BlockDefinition } from '../types';
import { TimelineComponent } from './TimelineView';
import { TimelineProperties } from './TimelineProperties';

export const TimelineBlockDefinition: BlockDefinition = {
    type: 'timeline',
    label: 'Timeline',
    icon: 'view_timeline',
    createBlock: (id) => ({
        id,
        type: 'timeline',
        content: [
            {
                title: 'Génesis', summary: 'Definición inicial', icon: 'lightbulb', theme: 'amber',
                detailTitle: 'Génesis', detailSubtitle: 'Propósito y conceptos clave antes de iniciar.',
                detailIcon: 'lightbulb',
                card1: { title: 'Metric', text: 'Description text goes here.', icon: 'check_circle' },
                card2: { title: 'Action', text: 'Description text goes here.', icon: 'check_circle' },
                footerTip: 'Tip de PMP: This is a helpful tip about this process step.',
                footerTipIcon: 'help'
            },
            {
                title: 'Viabilidad', summary: 'Business Case', icon: 'settings', theme: 'blue',
                detailTitle: 'Viabilidad', detailSubtitle: 'Evaluación financiera y estratégica.',
                detailIcon: 'settings',
                card1: { title: 'Metric', text: 'ROI & NPV calculations', icon: 'calculate' },
                card2: { title: 'Action', text: 'Approve Business Case', icon: 'thumb_up' },
                footerTip: 'Tip: Always align with strategic objectives.',
                footerTipIcon: 'info'
            },
            {
                title: 'Project Charter', summary: 'Autorización', icon: 'rocket_launch', theme: 'purple',
                detailTitle: 'Project Charter', detailSubtitle: 'Documento que formaliza el proyecto.',
                detailIcon: 'rocket_launch',
                card1: { title: 'Scope', text: 'High-level requirements', icon: 'list' },
                card2: { title: 'Auth', text: 'Sign-off via sponsor', icon: 'signature' },
                footerTip: 'Tip: The PM is assigned here.',
                footerTipIcon: 'person'
            }
        ],
        metadata: { activeStepIndex: 0 }
    }),
    Component: TimelineComponent,
    Properties: TimelineProperties
};
