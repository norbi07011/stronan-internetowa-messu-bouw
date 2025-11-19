export enum Language {
  NL = 'nl',
  EN = 'en',
  TR = 'tr',
  PL = 'pl',
  BG = 'bg',
  AR = 'ar',
  DE = 'de',
  HU = 'hu',
  FR = 'fr',
}

export interface Project {
  id: number;
  title: string;
  category: 'houtrot' | 'gevel' | 'timmerwerk' | 'inspectie';
  description: string;
  imageBefore: string;
  imageAfter: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
