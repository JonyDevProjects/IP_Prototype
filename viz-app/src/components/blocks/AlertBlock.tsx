import React from 'react';
import type { ContentBlock } from '../../types/course';
import type { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';

const AlertComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    playMode?: 'auto' | 'manual';
    onTTSComplete?: () => void;
    rate?: number;
    volume?: number;
}> = ({ block, isSelected, onClick, playMode, onTTSComplete, rate = 1, volume = 1 }) => {
    const data = block.content as any;
    const synth = window.speechSynthesis;
    const mountedRef = React.useRef(true);
    const lastCharIndexRef = React.useRef(0);

    // Mount tracking
    React.useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    // Full TTS Effect (Resume-supported)
    React.useEffect(() => {
        if (playMode === 'auto') {
            const textToRead = `${data.title}. ${data.text}`;
            if (textToRead.trim()) {
                synth.cancel();

                const startOffset = lastCharIndexRef.current;
                if (startOffset >= textToRead.length) {
                    lastCharIndexRef.current = 0;
                    if (onTTSComplete) onTTSComplete();
                    return;
                }

                const textSegment = textToRead.slice(startOffset);
                const utterance = new SpeechSynthesisUtterance(textSegment);

                // Load voices (simple retry logic if needed, but assuming loaded)
                const voices = synth.getVoices();
                // Simple voice selection fallback
                const selectedVoice = voices.find(v => v.lang.startsWith('es')) || null;
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    utterance.lang = selectedVoice.lang;
                } else {
                    utterance.lang = 'es-ES';
                }

                utterance.rate = rate;
                utterance.volume = volume;

                utterance.onboundary = (e) => {
                    lastCharIndexRef.current = startOffset + e.charIndex;
                };

                utterance.onend = () => {
                    if (mountedRef.current && onTTSComplete) {
                        lastCharIndexRef.current = 0;
                        onTTSComplete();
                    }
                };

                utterance.onerror = () => {
                    if (mountedRef.current && onTTSComplete) onTTSComplete();
                };

                synth.speak(utterance);
            } else {
                if (onTTSComplete) onTTSComplete();
            }
        } else {
            synth.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playMode, rate, volume, data]);

    return (
        <div
            className={`p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/30 flex gap-3 transition-all duration-200 ${playMode === 'auto'
                ? 'ring-2 ring-indigo-400 shadow-md transform scale-[1.01]'
                : isSelected ? 'ring-2 ring-[#7f13ec] ring-offset-2 ring-offset-white dark:ring-offset-[#150a1f]' : ''
                }`}
            onClick={onClick}
        >
            <span className="material-symbols-outlined text-indigo-500">{data.icon || 'lightbulb'}</span>
            <div>
                <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm mb-1">{data.title}</h4>
                <p className="text-indigo-800 dark:text-indigo-200 text-xs">{data.text}</p>
            </div>
        </div>
    );
};

const AlertProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    const data = block.content as any;
    const updateData = (updates: any) => onUpdate({ content: { ...data, ...updates } });

    return (
        <PropertySection title="Content" isOpen>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                        value={data.title || ''}
                        onChange={(e) => updateData({ title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Message</label>
                    <textarea
                        className="w-full h-20 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                        value={data.text || ''}
                        onChange={(e) => updateData({ text: e.target.value })}
                    />
                </div>
            </div>
        </PropertySection>
    );
};

export const AlertBlockDefinition: BlockDefinition = {
    type: 'alert',
    label: 'Interactive',
    icon: 'touch_app',
    createBlock: (id) => ({
        id,
        type: 'alert',
        content: {
            title: 'Did you know?',
            text: 'This is an interactive alert box.',
            icon: 'lightbulb'
        }
    }),
    Component: AlertComponent,
    Properties: AlertProperties
};
