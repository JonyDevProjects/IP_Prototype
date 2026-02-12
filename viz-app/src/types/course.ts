// Definición de la estructura de datos para el LMS (ExpertPath)

export type ContentBlockType = 'text' | 'image' | 'quiz' | 'timeline' | 'step' | 'alert' | 'mermaid' | 'carousel';

export interface BaseBlock {
  id: string;
  ttsEnabled?: boolean;
  metadata?: {
    className?: string;
    interactive?: boolean;
    [key: string]: unknown;
  };
}

export interface TextBlockContent {
  text: string;
}

export interface ImageBlockContent {
  src: string;
  alt?: string;
  caption?: string;
}

export interface QuizBlockContent {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface AlertBlockContent {
  title: string;
  text: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  icon?: string;
}

export type ThemeColor = 'amber' | 'blue' | 'purple' | 'green' | 'red' | 'slate' | 'indigo';

export interface TimelineCard {
  title: string;
  text: string;
  icon?: string;
}

export interface TimelineStep {
  title: string;
  summary?: string;
  icon?: string;
  theme?: ThemeColor;

  // Detail View
  detailTitle?: string;
  detailSubtitle?: string;

  // Dynamic Cards
  cards?: TimelineCard[];

  // Footer
  footerTip?: string;
  footerTipIcon?: string;

  // Images
  images?: string[];
}

export interface TimelineMetadata {
  activeStepIndex?: number;
  sequential?: boolean;
  maxUnlockedIndex?: number;
}

export interface TimelineBlock extends BaseBlock {
  type: 'timeline';
  content: TimelineStep[];
  metadata?: BaseBlock['metadata'] & TimelineMetadata;
}

export interface StepBlock extends BaseBlock {
  type: 'step';
  content: TimelineStep;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string; // Text blocks often just have the string directly as content in this app's legacy structure
}

export interface AlertBlock extends BaseBlock {
  type: 'alert';
  content: AlertBlockContent;
}

export interface GenericBlock extends BaseBlock {
  type: 'image' | 'quiz' | 'mermaid';
  content: unknown;
}

export interface CarouselSlide {
  id: string;
  title?: string;
  blocks: ContentBlock[];
}

export interface CarouselBlock extends BaseBlock {
  type: 'carousel';
  content: CarouselSlide[];
  metadata?: BaseBlock['metadata'] & {
    activeIndex?: number; // Index of the currently visible slide
    showArrows?: boolean;
    showDots?: boolean;
  };
}

export type ContentBlock = TimelineBlock | StepBlock | TextBlock | AlertBlock | CarouselBlock | GenericBlock;

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