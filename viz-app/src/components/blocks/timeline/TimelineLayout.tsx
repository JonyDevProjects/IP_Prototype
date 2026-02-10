import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { TimelineStep } from "./types";
import { StepDetailView } from "./StepDetailView";
import { InlineText } from "../../ui/InlineText";
import { useTimelineUpdates } from "./hooks/useTimelineUpdates";
import { TimelineStepHeader } from "./TimelineStepHeader";
import { TIMELINE_CONSTANTS } from "./constants";

interface TimelineLayoutProps {
    data: TimelineStep[];
    onUpdate: (updates: any) => void;
    isEditable?: boolean;
    onStepClick?: (index: number) => void;
    activeStepIndex?: number;
}

export const TimelineLayout = ({ data, onUpdate, isEditable = true, onStepClick, activeStepIndex }: TimelineLayoutProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const { updateActiveStep } = useTimelineUpdates(data, onUpdate);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref, data]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: TIMELINE_CONSTANTS.SCROLL_OFFSET,
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, TIMELINE_CONSTANTS.DEFAULT_OPACITY_TRANSFORM, [0, 1]);

    return (
        <div
            className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 lg:px-10">

            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => {
                    const isActive = activeStepIndex === index;
                    return (
                        <div
                            key={index}
                            className={`flex justify-start pt-20 md:pt-44 md:gap-10 transition-all duration-200 rounded-xl p-4 group
                                ${isEditable ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10' : ''}
                                ${isActive && isEditable ? 'bg-slate-50 dark:bg-white/5 border-blue-500/50 dark:border-blue-400/50 ring-1 ring-blue-500/20' : ''}
                            `}
                            onClick={(e) => {
                                if (!isEditable) return;
                                e.stopPropagation(); // prevent drag or parent selection
                                onStepClick?.(index);
                            }}
                            onMouseDown={(e) => {
                                if (isEditable) e.stopPropagation();
                            }}
                        >
                            <TimelineStepHeader
                                title={item.title}
                                isActive={isActive}
                                isEditable={isEditable}
                                onUpdateTitle={(val) => updateActiveStep(index, 'title', val)}
                                onStepClick={() => onStepClick?.(index)}
                            />

                            <div className="relative pl-4 pr-4 md:pl-8 flex-1 md:w-3/4">
                                <div className="md:hidden block mb-4">
                                    <InlineText
                                        tagName="h3"
                                        className={`text-2xl text-left font-bold transition-all duration-500 ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-300 dark:text-neutral-800'}`}
                                        value={item.title}
                                        disabled={!isEditable}
                                        onChange={(val) => updateActiveStep(index, 'title', val)}
                                        onStartEdit={() => onStepClick?.(index)}
                                    />
                                </div>
                                <div>
                                    <StepDetailView
                                        step={item}
                                        stepNumber={index + 1}
                                        showNumber={false}
                                        isEditable={isEditable}
                                        onUpdate={(field, val) => updateActiveStep(index, field, val)}
                                        // getHighlightClass needs logic if we want to support TTS highlighting in this view
                                        getHighlightClass={() => ''}
                                        onInteraction={() => onStepClick?.(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className={`absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,${TIMELINE_CONSTANTS.VAR_GRADIENT})] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:${TIMELINE_CONSTANTS.MASK_IMAGE}]`}
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />
                </div>
            </div>
        </div >
    );
};
