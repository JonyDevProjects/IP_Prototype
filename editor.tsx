import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Asumiendo que ya tienes esto
import { Course, Module, Unit } from '../types/course';

interface EditorLayoutProps {
  courseData: Course;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ courseData }) => {
  const { theme } = useTheme(); // Hook para usar tu contexto de tema actual
  const [activeModule, setActiveModule] = useState<string>(courseData.modules[0].id);

  return (
    <div className={`flex h-screen w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* LEFT SIDEBAR - COURSE STRUCTURE */}
      <aside className="w-64 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-slate-800 dark:text-white">ExpertPath Editor</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Estructura del Curso
          </div>
          
          {courseData.modules.map((module) => (
            <div key={module.id} className="mb-4">
               <div 
                 onClick={() => setActiveModule(module.id)}
                 className={`flex items-center justify-between mb-2 cursor-pointer ${activeModule === module.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}
               >
                  <span className="font-medium text-sm">{module.title}</span>
                  <span className="material-icons-round text-sm">expand_more</span>
               </div>
               
               {activeModule === module.id && (
                 <div className="pl-2 space-y-1 border-l-2 border-indigo-100 dark:border-slate-800 ml-1">
                    {module.units.map(unit => (
                        <div key={unit.id} className="pl-3 py-1 text-sm text-slate-500 hover:text-indigo-600 cursor-pointer flex items-center gap-2 group">
                            <span className="material-icons-round text-xs opacity-0 group-hover:opacity-100">drag_indicator</span>
                            {unit.title}
                        </div>
                    ))}
                    <button className="pl-3 py-1 text-sm text-indigo-600 flex items-center gap-1 hover:underline mt-2">
                        <span className="material-icons-round text-xs">add</span> Add Unit
                    </button>
                 </div>
               )}
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CANVAS */}
      <main className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
        {/* Toolbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <span className="material-icons-round">undo</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <span className="material-icons-round">redo</span>
                </button>
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                <span className="text-sm text-slate-500">Auto-saved 2m ago</span>
            </div>
            <div className="flex items-center gap-3">
                 <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                    Preview
                 </button>
                 <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">
                    Publish
                 </button>
            </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 min-h-[800px] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12">
                <div className="text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg mb-8 group hover:border-indigo-400 transition-colors cursor-pointer">
                    <span className="material-icons-round text-slate-300 text-4xl mb-2 group-hover:text-indigo-400">add_circle_outline</span>
                    <p className="text-slate-400 text-sm group-hover:text-indigo-500">Drag & Drop components here</p>
                </div>
                
                {/* Simulated Content Render based on JSON */}
                <div className="space-y-6 opacity-50 pointer-events-none grayscale">
                     <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Propósito de la Planificación</h1>
                     <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        La planificación no es un trámite burocrático...
                     </p>
                </div>
            </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR - COMPONENTS */}
      <aside className="w-72 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-white">Components</h3>
          </div>
          <div className="flex-1 p-4 grid grid-cols-2 gap-3 content-start">
              {['Text Block', 'Image', 'Quiz', 'Video', 'Timeline', 'Flashcard'].map((item) => (
                  <div key={item} className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col items-center gap-2 cursor-grab hover:shadow-md hover:border-indigo-400 transition-all">
                      <span className="material-icons-round text-slate-400">widgets</span>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{item}</span>
                  </div>
              ))}
          </div>
      </aside>
    </div>
  );
};