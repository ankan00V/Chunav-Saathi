import React from 'react';
import type { Phase, QuizQuestion } from '../../types/game';

interface QuizPanelProps {
  currentPhase: Phase;
  dynamicQuiz: QuizQuestion[] | null;
  qIdx: number;
  answered: boolean;
  feedback: { correct: boolean, text: string } | null;
  isGenerating: boolean;
  factIdx: number;
  reasoningText: string;
  funFacts: string[];
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onClose: () => void;
}

const QuizPanel: React.FC<QuizPanelProps> = ({
  currentPhase,
  dynamicQuiz,
  qIdx,
  answered,
  feedback,
  isGenerating,
  factIdx,
  reasoningText,
  funFacts,
  onAnswer,
  onNext,
  onClose
}) => {
  return (
    <div id="quiz-panel" style={{ display: 'block' }}>
      <div className="quiz-header">
        <div className="quiz-phase-badge" style={{ background: currentPhase.bg, color: currentPhase.color, borderColor: currentPhase.color + '50' }}>
          {currentPhase.icon} {currentPhase.name}
        </div>
        <button className="quiz-close" onClick={onClose} aria-label="Close Quiz">✕</button>
      </div>

      {isGenerating ? (
        <div style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>🧠</div>
          <h3 style={{ color: 'var(--gold)', fontFamily: "'Baloo 2', cursive" }}>Chunav Saathi is crafting your custom quiz...</h3>
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease-in-out'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p key={factIdx} style={{
                color: 'var(--gold)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginBottom: '10px',
                opacity: 0.8
              }}>
                {funFacts[factIdx]}
              </p>
              <p style={{
                color: '#fff',
                fontSize: '0.85rem',
                margin: 0,
                opacity: 0.6,
                lineHeight: '1.4'
              }}>
                {reasoningText || "Initializing AI logic..."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        (() => {
          const activeQuiz = dynamicQuiz || currentPhase.quiz;
          if (!activeQuiz || !activeQuiz[qIdx]) return null;
          return (
            <>
              <div className="quiz-progress">
                {activeQuiz.map((_, i) => (
                  <div key={i} className={`qp-dot ${i < qIdx ? 'done' : i === qIdx ? 'current' : ''}`}></div>
                ))}
              </div>
              <div className="quiz-q">{activeQuiz[qIdx].q}</div>
              <div className="options">
                {activeQuiz[qIdx].opts.map((o: string, i: number) => {
                  let btnCls = 'opt-btn';
                  if (answered) {
                    if (i === activeQuiz[qIdx].ans) btnCls += ' correct';
                    else if (feedback && !feedback.correct && i === activeQuiz[qIdx].ans) {
                       // Handled by the first condition actually
                    } else if (feedback && !feedback.correct && i !== activeQuiz[qIdx].ans) {
                       // This is handled by default class
                    }
                  }
                  
                  // Refined button classes for better feedback
                  const isCorrect = i === activeQuiz[qIdx].ans;
                  if (answered) {
                    if (isCorrect) btnCls += ' correct';
                    else if (feedback && !feedback.correct && i === activeQuiz[qIdx].ans) {
                      // Handled by first condition
                    }

                  }

                  return (
                    <button key={i} className={btnCls} onClick={() => onAnswer(i)} disabled={answered}>
                      <span className="opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                      {o}
                    </button>
                  )
                })}
              </div>
              {feedback && (
                <div className={`quiz-feedback ${feedback.correct ? 'correct' : 'wrong'}`} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: feedback.text }}></div>
              )}
              {answered && (
                <button className="quiz-next" style={{ display: 'inline-block' }} onClick={onNext}>Next →</button>
              )}
            </>
          );
        })()
      )}
    </div>
  );
};

export default React.memo(QuizPanel);
