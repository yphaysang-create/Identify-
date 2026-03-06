
export enum AppView {
  HOME = 'home',
  EDUCATION = 'education',
  ASSESSMENT = 'assessment',
  CHAT = 'chat'
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'knowledge' | 'behavior';
}

export interface AssessmentResult {
  score: number;
  total: number;
  feedback: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
