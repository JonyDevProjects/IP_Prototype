import React, { useEffect, useRef } from 'react';
import type { ContentBlock } from '../../types/course';
import type { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';
import { RichTextEditor } from '../ui/RichTextEditor';
import { getBestSpanishVoice } from '../../utils/ttsUtils';

const TextComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
    playMode?: 'auto' | 'manual';
    onTTSComplete?: () => void;
    rate?: number;
    volume?: number;
}> = ({ block, isSelected, onClick, onUpdate, playMode, onTTSComplete, rate = 1, volume = 1 }) => {
    const mountedRef = useRef(true);
    const synth = window.speechSynthesis;

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (playMode === 'auto') {
            // Extract plain text from HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = block.content as string;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';

            if (plainText.trim()) {
                console.log(`[TextBlock] Playing TTS. Rate: ${rate}, Volume: ${volume}`);
                synth.cancel();

                // Load voices and play
                const voices = synth.getVoices();
                const selectedVoice = getBestSpanishVoice(voices);

                const utterance = new SpeechSynthesisUtterance(plainText);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    utterance.lang = selectedVoice.lang;
                } else {
                    utterance.lang = 'es-ES';
                }

                // Ensure rate is applied
                utterance.rate = rate;
                utterance.volume = volume;

                utterance.onend = () => {
                    if (mountedRef.current && onTTSComplete) {
                        onTTSComplete();
                    }
                };

                // ... error handling ...

                utterance.onerror = (e) => {
                    console.error("Text Block TTS Error:", e);
                    if (mountedRef.current && onTTSComplete) {
                        onTTSComplete();
                    }
                };

                synth.speak(utterance);
            } else {
                // If no text, immediately complete
                if (onTTSComplete) {
                    onTTSComplete();
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playMode, rate, volume]);

    return (
        <div
            className={`p-6 rounded-lg bg-white dark:bg-[#1f1629] border transition-all duration-200 ${playMode === 'auto'
                ? 'border-[#7f13ec] ring-2 ring-[#7f13ec]/40 shadow-md'
                : isSelected
                    ? 'border-[#7f13ec] ring-2 ring-[#7f13ec]/20 shadow-md'
                    : 'border-slate-200 dark:border-white/5 hover:border-slate-300'
                }`}
            onClick={onClick}
        >
            <RichTextEditor
                content={block.content as string}
                onChange={(html) => onUpdate({ content: html })}
                readOnly={!isSelected}
                placeholder="Start typing or use the toolbar to format..."
            />
        </div>
    );
};

const TextProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    return (
        <PropertySection title="Content" isOpen>
            <div>
                <label className="block text-xs text-slate-500 mb-1.5">Rich Text Content</label>
                {/* We use the same editor here but perhaps with less padding or different class */}
                <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-slate-50 dark:bg-white/5 p-2">
                    <RichTextEditor
                        content={block.content as string}
                        onChange={(html) => onUpdate({ content: html })}
                        className="text-xs min-h-[150px]"
                        forceToolbar
                    />
                </div>
            </div>
        </PropertySection>
    );
};

export const TextBlockDefinition: BlockDefinition = {
    type: 'text',
    label: 'Text',
    icon: 'title',
    createBlock: (id) => ({
        id,
        type: 'text',
        content: 'Edit this text...'
    }),
    Component: TextComponent,
    Properties: TextProperties
};
