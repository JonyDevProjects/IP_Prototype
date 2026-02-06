import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { }, // Deprecated
        removeListener: () => { }, // Deprecated
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => { },
    }),
});

// Mock SpeechSynthesis
class MockSpeechSynthesisUtterance {
    text: string;
    lang: string = '';
    voice: SpeechSynthesisVoice | null = null;
    rate: number = 1;
    pitch: number = 1;
    volume: number = 1;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: ((event: any) => void) | null = null;

    constructor(text: string) {
        this.text = text;
    }
}

const mockSpeechSynthesis = {
    speak: (utterance: MockSpeechSynthesisUtterance) => {
        // trigger onstart immediately
        if (utterance.onstart) {
            utterance.onstart();
        }
        // Store timeout to trigger onend later if needed in tests,
        // but for basic tests we might trigger it manually or instantly.
        // For now, let's just expose it for testing spying.
    },
    cancel: () => { },
    getVoices: () => [] as SpeechSynthesisVoice[],
    paused: false,
    pending: false,
    speaking: false,
    onvoiceschanged: null,
};

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    writable: true,
    value: MockSpeechSynthesisUtterance,
});

Object.defineProperty(window, 'speechSynthesis', {
    writable: true,
    value: mockSpeechSynthesis,
});

// Mock IntersectionObserver
class MockIntersectionObserver {
    observe = () => { };
    disconnect = () => { };
    unobserve = () => { };
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});
