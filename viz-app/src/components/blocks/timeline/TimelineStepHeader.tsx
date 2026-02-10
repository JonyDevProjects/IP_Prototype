import { InlineText } from "../../ui/InlineText";

interface TimelineStepHeaderProps {
    title: string;
    isActive: boolean;
    isEditable: boolean;
    onUpdateTitle: (newTitle: string) => void;
    onStepClick: () => void;
}

export const TimelineStepHeader = ({
    title,
    isActive,
    isEditable,
    onUpdateTitle,
    onStepClick
}: TimelineStepHeaderProps) => {
    return (
        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-16 md:w-1/4">
            <div className={`h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 
                ${isActive ? 'scale-125 ring-2 ring-purple-500/30' : 'group-hover:scale-115 group-hover:ring-2 group-hover:ring-purple-500/10'}`}>
                <div className={`h-4 w-4 rounded-full border p-2 transition-all duration-500 
                    ${isActive ? 'bg-purple-500 border-purple-400 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 group-hover:bg-purple-500/40 group-hover:border-purple-400/50 group-hover:scale-110'}`} />
            </div>
            <div className="hidden md:block md:pl-20">
                <InlineText
                    tagName="h3"
                    className={`text-xl md:text-3xl font-bold transition-all duration-500 
                        ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-300 dark:text-neutral-800 group-hover:text-neutral-500 dark:group-hover:text-neutral-400'}`}
                    value={title}
                    disabled={!isEditable}
                    onChange={onUpdateTitle}
                    onStartEdit={onStepClick}
                />
            </div>
        </div>
    );
};
