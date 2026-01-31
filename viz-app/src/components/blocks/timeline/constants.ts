
export const AVAILABLE_ICONS = [
    'lightbulb', 'settings', 'rocket_launch', 'check_circle',
    'flag', 'star', 'schedule', 'build', 'visibility',
    'favorite', 'thumb_up', 'warning', 'info', 'help', 'home',
    'person', 'groups', 'work', 'assignment', 'bolt',
    'key', 'description', 'list', 'done_all', 'search',
    'call_split', 'timeline', 'psychology', 'group_add'
];

export type ThemeColor = 'amber' | 'blue' | 'purple' | 'green' | 'red' | 'slate';

export const STEP_THEMES: Record<ThemeColor, any> = {
    amber: {
        bg: 'bg-amber-50', text: 'text-amber-900', iconBg: 'bg-amber-100 text-amber-500',
        border: 'border-amber-400', hoverBorder: 'hover:border-amber-200',
        detail: { border: 'border-amber-200', iconColor: 'text-amber-400', activeBorder: 'border-amber-400 border-b-4' }
    },
    blue: {
        bg: 'bg-blue-50', text: 'text-blue-900', iconBg: 'bg-blue-100 text-blue-500',
        border: 'border-blue-400', hoverBorder: 'hover:border-blue-200',
        detail: { border: 'border-blue-200', iconColor: 'text-blue-500', activeBorder: 'border-blue-400 border-b-4' }
    },
    purple: {
        bg: 'bg-purple-50', text: 'text-purple-900', iconBg: 'bg-purple-100 text-purple-500',
        border: 'border-purple-400', hoverBorder: 'hover:border-purple-200',
        detail: { border: 'border-purple-200', iconColor: 'text-purple-500', activeBorder: 'border-purple-400 border-b-4' }
    },
    green: {
        bg: 'bg-emerald-50', text: 'text-emerald-900', iconBg: 'bg-emerald-100 text-emerald-500',
        border: 'border-emerald-400', hoverBorder: 'hover:border-emerald-200',
        detail: { border: 'border-emerald-200', iconColor: 'text-emerald-500', activeBorder: 'border-emerald-400 border-b-4' }
    },
    red: {
        bg: 'bg-rose-50', text: 'text-rose-900', iconBg: 'bg-rose-100 text-rose-500',
        border: 'border-rose-400', hoverBorder: 'hover:border-rose-200',
        detail: { border: 'border-rose-200', iconColor: 'text-rose-500', activeBorder: 'border-rose-400 border-b-4' }
    },
    slate: {
        bg: 'bg-slate-50', text: 'text-slate-900', iconBg: 'bg-slate-200 text-slate-500',
        border: 'border-slate-300', hoverBorder: 'hover:border-slate-300',
        detail: { border: 'border-slate-200', iconColor: 'text-slate-400', activeBorder: 'border-slate-400 border-b-4' }
    }
};
