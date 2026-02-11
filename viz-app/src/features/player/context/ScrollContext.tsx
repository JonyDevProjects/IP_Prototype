import React, { createContext, useContext, useRef } from 'react';
import type { RefObject } from 'react';

interface ScrollContextType {
    scrollContainerRef: RefObject<HTMLElement> | null;
}

const ScrollContext = createContext<ScrollContextType>({
    scrollContainerRef: null
});

export const useScrollContext = () => useContext(ScrollContext);

interface ScrollContextProviderProps {
    children: React.ReactNode;
    value?: RefObject<HTMLElement | null>;
}

export const ScrollContextProvider: React.FC<ScrollContextProviderProps> = ({ children, value }) => {
    const internalRef = useRef<HTMLElement>(null);
    const scrollContainerRef = (value as RefObject<HTMLElement>) || internalRef;

    return (
        <ScrollContext.Provider value={{ scrollContainerRef }}>
            {children}
        </ScrollContext.Provider>
    );
};
