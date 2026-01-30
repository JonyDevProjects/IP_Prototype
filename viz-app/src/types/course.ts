// Definición de la estructura de datos para el LMS (ExpertPath)

export type ContentBlockType = 'text' | 'image' | 'quiz' | 'timeline' | 'alert' | 'mermaid';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: any; // Puede ser string, objeto de quiz, etc.
  metadata?: {
    className?: string; // Para overrides de estilo
    interactive?: boolean;
  };
}

export interface Unit {
  id: string;
  title: string;
  durationMin: number;
  blocks: ContentBlock[];
  isCompleted?: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  modules: Module[];
  totalProgress: number; // 0-100
}