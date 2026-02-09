import { useState, Suspense, lazy } from 'react'
import { PlayerMain } from './features/player/components/PlayerMain'
// Lazy load EditorMain since it's heavy and not needed for Player view
const EditorMain = lazy(() => import('./features/editor/components/EditorMain').then(module => ({ default: module.EditorMain })));
import { tema2CourseData } from './data/mocks/tema2Mock'
import type { Course } from './types/course'

function App() {
  const [viewMode, setViewMode] = useState<'player' | 'editor'>('player');

  // Load initial state from LocalStorage or Fallback to Mock
  // Load initial state from LocalStorage or Fallback to Mock
  const [courseData, setCourseData] = useState<Course>(() => {
    // Try to load from local storage first
    try {
      const saved = localStorage.getItem('ip_course_data');
      return saved ? JSON.parse(saved) : tema2CourseData;
    } catch (e) {
      console.error("Failed to load course data", e);
      return tema2CourseData;
    }
  });

  // Save to LocalStorage whenever courseData changes (auto-save for now, or explicit save via Editor)
  // For this prototype, we'll pass a dedicated 'onSave' handler to Editor to commit changes.
  const handleSave = (updatedCourse: Course) => {
    setCourseData(updatedCourse);
    localStorage.setItem('ip_course_data', JSON.stringify(updatedCourse));
    // Optional: Visual feedback could go here
    console.log('Course Saved!', updatedCourse);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres resetear todos los datos? Se perderán los cambios guardados en el Editor.')) {
      localStorage.removeItem('ip_course_data');
      setCourseData(tema2CourseData);
      console.log('Course Reset to Defaults!');
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#191022] transition-colors duration-300">

      {/* Development Toggle - Centered for better access */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-2 bg-black/60 dark:bg-[#1a1321]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 hover:scale-105 group">
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('player')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${viewMode === 'player' ? 'bg-[#7f13ec] text-white shadow-lg shadow-[#7f13ec]/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Player View
          </button>
          <button
            onClick={() => setViewMode('editor')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${viewMode === 'editor' ? 'bg-[#7f13ec] text-white shadow-lg shadow-[#7f13ec]/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Editor View
          </button>
        </div>

        <div className="w-px h-6 bg-white/10 group-hover:bg-white/20 transition-colors"></div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/30 hover:text-white transition-all duration-300"
        >
          Reset Data
        </button>
      </div>

      {/* Renderizado Condicional */}
      {viewMode === 'player' ? (
        <PlayerMain courseData={courseData} />
      ) : (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#150a1f] text-slate-400">Loading Editor...</div>}>
          <EditorMain courseData={courseData} onSave={handleSave} />
        </Suspense>
      )}

    </div>
  )
}

export default App