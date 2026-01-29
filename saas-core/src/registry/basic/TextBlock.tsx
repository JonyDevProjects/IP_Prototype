import React from 'react';
import type { BaseComponentProps } from '../../types/CourseTypes';

interface TextBlockProps extends BaseComponentProps {
    title?: string;
    content: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({ title, content, className = '' }) => {
    return (
        <div className={`p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${className}`}>
            {title && (
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    {title}
                </h3>
            )}
            <div
                className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};
