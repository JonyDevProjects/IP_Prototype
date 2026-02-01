
import type { ThemeColor } from './constants';

export interface TimelineCard {
    title: string;
    text: string;
    icon?: string;
}

export interface TimelineStep {
    title: string;
    summary?: string;
    icon?: string;
    theme?: ThemeColor;

    // Detail View
    detailTitle?: string;
    detailSubtitle?: string;
    detailIcon?: string;

    // Dynamic Cards
    cards?: TimelineCard[];

    // Footer
    footerTip?: string;
    footerTipIcon?: string;
}

export interface TimelineMetadata {
    activeStepIndex: number;
    sequential?: boolean;
    maxUnlockedIndex?: number;
}
