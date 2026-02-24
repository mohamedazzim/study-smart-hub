export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  author: string;
  isPurchased: boolean;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  totalQuestions: number;
  totalMarks: number;
  isFree: boolean;
  price: number;
  isPurchased: boolean;
  isAttempted: boolean;
  score?: number;
  subject: string;
}

export interface Question {
  id: string;
  testId: string;
  type: 'mcq' | 'fill-blank' | 'fraction' | 'image-based';
  questionText: string; // LaTeX supported
  options?: string[];
  correctAnswer: string;
  marks: number;
  negativeMarks: number;
  imageUrl?: string;
  videoExplanationUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}
