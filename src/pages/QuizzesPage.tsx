import React, { useState } from 'react';
import { BrainCircuit, CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { QUIZZES_DATA } from '../data/quizzesData';
import { UserProgress, UserSettings } from '../types';
import { soundManager } from '../utils/audio';

interface Props {
  initialTopicId?: string;
  progress: UserProgress;
  settings: UserSettings;
  onCompleteQuiz: (xpEarned: number) => void;
}

export const QuizzesPage: React.FC<Props> = ({
  initialTopicId,
  progress,
  settings,
  onCompleteQuiz,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || 'arrays'
  );

  const quiz = QUIZZES_DATA[selectedTopicId] || QUIZZES_DATA['arrays'];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = quiz.questions[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 10);
      if (settings.soundEnabled) soundManager.playCorrect();
    } else {
      if (settings.soundEnabled) soundManager.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (settings.soundEnabled) soundManager.playLevelUp();
      onCompleteQuiz(score);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto text-slate-100">
      {/* Quiz Topic Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            KNOWLEDGE VERIFICATION
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Interactive Topic Quizzes</h2>
        </div>

        <select
          value={selectedTopicId}
          onChange={(e) => {
            setSelectedTopicId(e.target.value);
            handleRestartQuiz();
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-100 focus:outline-none"
        >
          {Object.keys(QUIZZES_DATA).map((tId) => (
            <option key={tId} value={tId}>
              {QUIZZES_DATA[tId].topicTitle} Quiz
            </option>
          ))}
        </select>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {!quizFinished ? (
          <>
            {/* Question Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-indigo-400">
                Question {currentQuestionIdx + 1} of {quiz.questions.length}
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                Score: {score} XP
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Code Snippet if applicable */}
            {currentQuestion.codeSnippet && (
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-indigo-200">
                {currentQuestion.codeSnippet}
              </pre>
            )}

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;

                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-100 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-600/30 border-rose-400 text-rose-100 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all font-semibold flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 leading-relaxed space-y-3">
                <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs shadow-lg shadow-indigo-600/30"
                  >
                    {currentQuestionIdx < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Quiz Results Summary */
          <div className="text-center space-y-6 py-6">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-3xl font-black text-white">Quiz Completed!</h3>
            <p className="text-sm text-slate-300">
              You scored <strong className="text-indigo-400">{score} XP</strong> on {quiz.topicTitle}!
            </p>

            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
