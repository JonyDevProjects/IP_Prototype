import type { ContentBlock, Unit } from '../types/course';
import type { TimelineStep } from '../components/blocks/timeline/types';

export interface TTSItem {
    id: string;
    text: string;
    blockId: string;
}

/**
 * Extracts speakable items from a generic ContentBlock
 */
export const getBlockTTSItems = (block: ContentBlock): TTSItem[] => {
    // Skip if explicitly disabled
    if (block.ttsEnabled === false) return [];

    switch (block.type) {
        case 'step':
            return getStepTTSItems(block.content as TimelineStep, block.id);
        case 'text':
            return getTextTTSItems(block.content as string, block.id);
        case 'alert':
            return getAlertTTSItems(block.content, block.id);
        // Add other block types here
        default:
            return [];
    }
};

/**
 * Flattens an entire unit into a playlist of speakable items
 */
export const getUnitTTSItems = (unit: Unit): TTSItem[] => {
    return unit.blocks.flatMap(block => getBlockTTSItems(block));
};

// --- Block Specific Extractors ---

const getStepTTSItems = (step: TimelineStep, blockId: string): TTSItem[] => {
    const items: TTSItem[] = [];
    const prefix = blockId; // Use blockId as prefix for global uniqueness within unit

    // Title
    if (step.detailTitle || step.title) {
        items.push({
            id: `${prefix}-title`,
            text: step.detailTitle || step.title,
            blockId
        });
    }

    // Reference existing useStepTTS logic but adapted for global generic usage
    // Note: The specific ID format must match what the View expects for highlighting

    if (step.detailSubtitle) {
        items.push({
            id: `${prefix}-subtitle`,
            text: step.detailSubtitle,
            blockId
        });
    }

    (step.cards || []).forEach((card, idx) => {
        if (card.title || card.text) {
            items.push({
                id: `${prefix}-card-${idx}`,
                text: `${card.title}. ${card.text}`,
                blockId
            });
        }
    });

    if (step.footerTip) {
        items.push({
            id: `${prefix}-footer`,
            text: `Nota: ${step.footerTip}`,
            blockId
        });
    }

    return items;
};

const getTextTTSItems = (content: string, blockId: string): TTSItem[] => {
    // Simple extraction - in real app might strip markdown
    // For now, let's just return the whole text as one chunk
    // Use a clean version stripping basic markdown chars for better TTS
    const cleanText = content.replace(/[#*`_]/g, '');
    return [{
        id: blockId, // Text blocks usually just highlight the whole container
        text: cleanText,
        blockId
    }];
};

export const getAlertTTSItems = (content: any, blockId: string): TTSItem[] => {
    return [{
        id: blockId,
        text: `${content.title}. ${content.text}`,
        blockId
    }];
};

/**
 * Helper to find the best available Spanish voice across different browsers
 */
export const getBestSpanishVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (!voices || voices.length === 0) return null;

    // Rankings: 
    // 1. Google Español (Chrome)
    // 2. Microsoft Natural (Edge)
    // 3. Paulina (Mexico) or Monica (Spain) - Common high quality
    // 4. Any es-ES
    // 5. Any es-*

    const isGoogle = (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang.includes('es');
    const isMicrosoftNatural = (v: SpeechSynthesisVoice) => v.name.includes('Microsoft') && v.name.includes('Natural') && v.lang.includes('es');
    const isPremiumEs = (v: SpeechSynthesisVoice) => (v.name.includes('Paulina') || v.name.includes('Monica')) && v.lang.includes('es');

    return voices.find(isGoogle)
        || voices.find(isMicrosoftNatural)
        || voices.find(isPremiumEs)
        || voices.find(v => v.lang === 'es-ES')
        || voices.find(v => v.lang.startsWith('es'))
        || null;
};
