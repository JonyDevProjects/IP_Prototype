import React, { useState } from 'react';
import type { BaseComponentProps } from '../../types/CourseTypes';
import {
    Lightbulb,
    Settings,
    FileText,
    Target,
    Users,
    Rocket,
    CheckCircle,
    HelpCircle,
    Info
} from 'lucide-react';

// Icon mapping
const ICON_MAP: Record<string, React.ReactNode> = {
    'lightbulb': <Lightbulb className="w-12 h-12 text-yellow-500" />,
    'settings': <Settings className="w-12 h-12 text-blue-500" />,
    'file-text': <FileText className="w-12 h-12 text-indigo-500" />,
    'target': <Target className="w-12 h-12 text-red-500" />,
    'users': <Users className="w-12 h-12 text-green-500" />,
    'rocket': <Rocket className="w-12 h-12 text-purple-600" />,
    'default': <Info className="w-12 h-12 text-gray-500" />
};

export interface TabItemContent {
    label: string;
    text: string;
}

export interface TabItem {
    id: number | string;
    title: string;
    subtitle: string;
    iconName: string; // Key for ICON_MAP
    color: string; // Tailwind border color class
    bg: string; // Tailwind bg class
    content: TabItemContent[];
}

interface TabbedInfoCardProps extends BaseComponentProps {
    items: TabItem[];
    tip?: string;
}

export const TabbedInfoCard: React.FC<TabbedInfoCardProps> = ({ items, tip, className = '' }) => {
    const [currentStep, setCurrentStep] = useState(0);

    if (!items || items.length === 0) return <div className="text-red-500">No items data provided</div>;

    const activeItem = items[currentStep];

    const getIcon = (name: string) => {
        return ICON_MAP[name] || ICON_MAP['default'];
    };

    return (
        <div className={`animate-fade-in p-4 md:p-8 font-sans ${className}`}>
            {/* Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {items.map((step, index) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 border-b-4 shadow-sm ${currentStep === index
                            ? `bg-white dark:bg-slate-800 ${step.color} translate-y-1 shadow-inner`
                            : 'bg-white dark:bg-slate-800 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                            }`}
                    >
                        <div className={`mb-2 p-2 rounded-full ${currentStep === index ? step.bg : 'bg-slate-100'} dark:bg-opacity-20`}>
                            <div className="scale-75 origin-center">
                                {getIcon(step.iconName)}
                            </div>
                        </div>
                        <span className={`font-bold text-sm ${currentStep === index ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                            {step.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Content Card */}
            <div className={`relative w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border-t-8 ${activeItem.color} transition-all duration-300`}>
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                        <div className={`p-4 rounded-full ${activeItem.bg} shadow-inner`}>
                            {getIcon(activeItem.iconName)}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{activeItem.title}</h2>
                            <p className="text-lg text-slate-500 dark:text-slate-300 font-medium">{activeItem.subtitle}</p>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {activeItem.content.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                                    {item.label}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Helper Tip */}
                    {tip && (
                        <div className="mt-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 mx-auto w-fit">
                            <HelpCircle className="w-4 h-4" />
                            <span dangerouslySetInnerHTML={{ __html: tip }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
