import { useState } from 'react';
import { CourseRenderer } from './engine/CourseRenderer';
import { DEMO_COURSE } from './data/mocks/demo-course';
import { BookOpen, Edit, Play } from 'lucide-react';
import { EditorLayout } from './features/editor/EditorLayout';

function App() {
  const [mode, setMode] = useState<'player' | 'editor'>('player');
  const [courseData, setCourseData] = useState(DEMO_COURSE);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-sm p-2 flex justify-between items-center">
          <div className="flex items-center gap-3 px-4">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">E-Learning SaaS <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-2">PROTOTYPE</span></span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode('player')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${mode === 'player' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              <Play className="w-4 h-4" />
              Player
            </button>
            <button
              onClick={() => setMode('editor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${mode === 'editor' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              <Edit className="w-4 h-4" />
              Editor
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {mode === 'player' ? (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold mb-4">{courseData.title}</h1>
              <p className="text-slate-500 dark:text-slate-400">Version {courseData.version}</p>
            </header>

            {/* Render the First Unit of the First Module by default */}
            <CourseRenderer components={courseData.modules[0].units[0].components} />
          </div>
        ) : (
          <EditorLayout />
        )}
      </main>

    </div>
  );
}

export default App;
