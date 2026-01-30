import React, { useState } from 'react';
import { Course, Unit } from '../types/course';

interface PlayerLayoutProps {
  courseData: Course;
}

export const PlayerLayout: React.FC<PlayerLayoutProps> = ({ courseData }) => {
  // Estado simple para simular navegación
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const activeModule = courseData.modules[currentModuleIndex];
  const activeUnit = activeModule.units[currentUnitIndex];

  // Calcular progreso global simple
  const totalUnits = courseData.modules.reduce((acc, m) => acc + m.units.length, 0);
  const currentGlobalIndex = courseData.modules.slice(0, currentModuleIndex).reduce((acc, m) => acc + m.units.length, 0) + currentUnitIndex + 1;
  const progressPercent = (currentGlobalIndex / totalUnits) * 100;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#191022] overflow-hidden font-sans text-slate-900 dark:text-[#ede7f3]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-80 bg-white dark:bg-[#140d1b] border-r border-slate-200 dark:border-white/10 flex flex-col z-20 shadow-xl">
        <div className="p-6 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                    IP
                </div>
                <div>
                    <h2 className="font-bold text-sm leading-tight dark:text-white">Proyecto IP 2526</h2>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Curso Interactivo</p>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-gray-400">
                    <span>Course Progress</span>
                    <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{width: `${progressPercent}%`}}></div>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
            {courseData.modules.map((module, mIdx) => (
                <div key={module.id} className="mb-6">
                    <h3 className="px-6 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
                        {module.order}. {module.title}
                    </h3>
                    <div className="space-y-1">
                        {module.units.map((unit, uIdx) => {
                            const isActive = mIdx === currentModuleIndex && uIdx === currentUnitIndex;
                            return (
                                <button
                                    key={unit.id}
                                    onClick={() => { setCurrentModuleIndex(mIdx); setCurrentUnitIndex(uIdx); }}
                                    className={`w-full px-6 py-3 flex items-start gap-3 text-left transition-colors relative
                                        ${isActive 
                                            ? 'bg-purple-50 dark:bg-purple-900/20 border-r-4 border-purple-600' 
                                            : 'hover:bg-slate-50 dark:hover:bg-white/5 border-r-4 border-transparent'
                                        }
                                    `}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                        ${unit.isCompleted 
                                            ? 'bg-green-500 border-green-500 text-white' 
                                            : isActive ? 'border-purple-600' : 'border-slate-300 dark:border-gray-600'
                                        }
                                    `}>
                                        {unit.isCompleted && <span className="material-icons-round text-[10px] font-bold">check</span>}
                                    </div>
                                    <div>
                                        <div className={`text-sm font-medium ${isActive ? 'text-purple-700 dark:text-purple-300' : 'text-slate-600 dark:text-gray-400'}`}>
                                            {unit.title}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <span className="material-icons-round text-[10px]">schedule</span>
                                            {unit.durationMin} min
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
         {/* Top Bar */}
         <header className="h-16 px-8 flex items-center justify-between bg-white/80 dark:bg-[#191022]/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100 dark:border-white/5">
             <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                 <span>{activeModule.title}</span>
                 <span className="material-icons-round text-xs">chevron_right</span>
                 <span className="text-slate-900 dark:text-white font-medium">{activeUnit.title}</span>
             </div>
             <div className="flex items-center gap-2">
                 <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold">
                    XP +20
                 </span>
             </div>
         </header>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-0">
             <div className="max-w-3xl mx-auto py-12 pb-32">
                 
                 {/* Unit Title */}
                 <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
                    {activeUnit.title}
                 </h1>

                 {/* DYNAMIC CONTENT RENDERING */}
                 <div className="space-y-8">
                     {activeUnit.blocks.map((block) => (
                         <div key={block.id} className="animate-fade-in-up">
                             
                             {/* Text Block */}
                             {block.type === 'text' && (
                                 <p className="text-lg leading-relaxed text-slate-700 dark:text-gray-300">
                                     {block.content}
                                 </p>
                             )}

                             {/* Alert/Concept Block */}
                             {block.type === 'alert' && (
                                 <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 flex gap-4">
                                     <span className="material-icons-round text-blue-500 text-2xl">lightbulb</span>
                                     <div>
                                         <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">{block.content.title}</h4>
                                         <p className="text-blue-800 dark:text-blue-200 text-sm">{block.content.text}</p>
                                     </div>
                                 </div>
                             )}

                             {/* Timeline Block (Custom) */}
                             {block.type === 'timeline' && (
                                 <div className="py-6">
                                     <div className="relative border-l-2 border-purple-200 dark:border-purple-900/50 ml-3 space-y-8">
                                        {block.content.map((step: any, idx: number) => (
                                            <div key={idx} className="relative pl-8">
                                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-white dark:border-[#191022]"></div>
                                                <h5 className="font-bold text-slate-900 dark:text-white">{step.title}</h5>
                                                <p className="text-sm text-slate-500 dark:text-gray-400">{step.desc}</p>
                                            </div>
                                        ))}
                                     </div>
                                 </div>
                             )}
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Footer Controls */}
         <footer className="h-20 bg-white dark:bg-[#140d1b] border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-8 absolute bottom-0 w-full">
             <button 
                onClick={() => alert('Prev')}
                className="px-6 py-2 rounded-lg text-slate-500 dark:text-gray-400 font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                disabled={currentUnitIndex === 0 && currentModuleIndex === 0}
            >
                 Back
             </button>

             <button 
                 onClick={() => {
                     // Lógica simple de siguiente
                     if(currentUnitIndex < activeModule.units.length - 1) setCurrentUnitIndex(prev => prev + 1);
                     else if (currentModuleIndex < courseData.modules.length - 1) {
                         setCurrentModuleIndex(prev => prev + 1);
                         setCurrentUnitIndex(0);
                     }
                 }}
                 className="px-8 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/40 hover:bg-purple-700 hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
                 <span>Next Lesson</span>
                 <span className="material-icons-round">arrow_forward</span>
             </button>
         </footer>
      </main>
    </div>
  );
};