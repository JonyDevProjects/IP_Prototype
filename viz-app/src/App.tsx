import { useState } from 'react'
import { PlayerMain } from './features/player/components/PlayerMain'
import { EditorMain } from './features/editor/components/EditorMain'
import { tema2CourseData } from './data/mocks/tema2Mock'

function App() {
  const [viewMode, setViewMode] = useState<'player' | 'editor'>('player');

  // Load initial state from LocalStorage or Fallback to Mock
  const [courseData, setCourseData] = useState(() => {
    const saved = localStorage.getItem('ip_course_data');
    return saved ? JSON.parse(saved) : tema2CourseData;
  });

  // Save to LocalStorage whenever courseData changes (auto-save for now, or explicit save via Editor)
  // For this prototype, we'll pass a dedicated 'onSave' handler to Editor to commit changes.
  const handleSave = (updatedCourse: any) => {
    setCourseData(updatedCourse);
    localStorage.setItem('ip_course_data', JSON.stringify(updatedCourse));
    // Optional: Visual feedback could go here
    console.log('Course Saved!', updatedCourse);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#191022] transition-colors duration-300">

      {/* Development Toggle */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-black/80 p-2 rounded-full backdrop-blur-sm border border-white/10">
        <button
          onClick={() => setViewMode('player')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${viewMode === 'player' ? 'bg-[#7f13ec] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Player View
        </button>
        <button
          onClick={() => setViewMode('editor')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${viewMode === 'editor' ? 'bg-[#7f13ec] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Editor View
        </button>
      </div>

      {/* Renderizado Condicional */}
      {viewMode === 'player' ? (
        <PlayerMain courseData={courseData} />
      ) : (
        <EditorMain courseData={courseData} onSave={handleSave} />
      )}

    </div>
  )
}

export default App