export type UserLevelName = 
  | 'Beginner'
  | 'Explorer'
  | 'Coder'
  | 'Algorithm Apprentice'
  | 'DSA Warrior'
  | 'Problem Solver'
  | 'DSA Master';

export interface UserProgress {
  xp: number;
  level: number;
  levelName: UserLevelName;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedTopics: string[]; // topic IDs
  completedGames: string[]; // game IDs
  completedChallenges: string[]; // challenge IDs
  unlockedBadges: string[]; // badge IDs
  quizScores: Record<string, number>; // topicId -> score out of 100
  codeSolutions: Record<string, string>; // challengeId -> C++ code
  currentTopicId: string;
}

export interface UserSettings {
  darkMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface TopicItem {
  id: string;
  levelNum: number;
  topicNum: number;
  title: string;
  category: string;
  description: string;
  estimatedTime: string;
  prerequisites: string[];
  hasVisualization: boolean;
  hasGame: boolean;
  gameId?: string;
}

export interface LevelCategory {
  levelNum: number;
  title: string;
  description: string;
  topics: TopicItem[];
}

export interface CodeLineExplanation {
  lineNum: number;
  code: string;
  explanation: string;
}

export interface LessonContent {
  topicId: string;
  title: string;
  level: string;
  whatIsIt: string;
  realLifeExample: {
    analogy: string;
    details: string;
  };
  cppCode: string;
  codeLines: CodeLineExplanation[];
  expectedOutput: string;
  visualizationType: 'array' | 'binary_search' | 'stack' | 'queue' | 'linked_list' | 'recursion' | 'tree' | 'graph' | 'sorting' | 'complexity';
  miniGameId?: string;
  miniGameTitle?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'predict_output' | 'find_bug';
  options: string[];
  correctAnswer: number; // index in options
  explanation: string;
  hint: string;
  codeSnippet?: string;
}

export interface QuizData {
  topicId: string;
  topicTitle: string;
  questions: QuizQuestion[];
}

export interface TestDataCase {
  input: string;
  expectedOutput: string;
  isSecret?: boolean;
}

export interface CodingChallenge {
  id: string;
  topicId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  exampleInput: string;
  exampleOutput: string;
  expectedApproach: string;
  starterCppCode: string;
  solutionCppCode: string;
  testCases: TestDataCase[];
  hints: [string, string, string]; // Hint 1, 2, 3
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requiredXp?: number;
  requiredTopicCount?: number;
  requiredTopicId?: string;
  requiredCategory?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
  avatarColor: string;
}
