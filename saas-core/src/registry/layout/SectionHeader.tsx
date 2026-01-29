import React from 'react';
import type { BaseComponentProps } from '../../types/CourseTypes';

interface SectionHeaderProps extends BaseComponentProps {
    title: string;
    description?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, className = '' }) => {
    return (
        <div className={`text-center space-y-4 mb-8 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent inline-block">
                {title}
            </h2>
            {description && (
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};
