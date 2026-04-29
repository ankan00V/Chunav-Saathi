import React from 'react';
import DOMPurify from 'dompurify';
import type { Phase } from '../../types/game';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface InfoPanelProps {
  currentPhase: Phase;
  deepDiveText: string | null;
  onClose: () => void;
  onStartQuiz: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ 
  currentPhase, 
  deepDiveText, 
  onClose, 
  onStartQuiz 
}) => {
  const containerRef = useFocusTrap(true);
  const sanitizedBody = DOMPurify.sanitize(currentPhase.info.body.replace(/\n/g, '<br><br>'));
  
  return (
    <div id="info-panel" ref={containerRef} style={{ display: 'block' }} role="dialog" aria-modal="true">

      <div className="info-header">
        <div>
          <div className="quiz-phase-badge" style={{ background: currentPhase.bg, color: currentPhase.color, borderColor: currentPhase.color + '50' }}>
            {currentPhase.icon} {currentPhase.name}
          </div>
          <div className="info-title" style={{ marginTop: '10px' }}>Learn: {currentPhase.name}</div>
        </div>
        <button className="quiz-close" onClick={onClose} aria-label="Close Info Panel">✕</button>
      </div>
      <div className="info-body" dangerouslySetInnerHTML={{ __html: sanitizedBody }}></div>


      {/* Google Service Integration: Gemini Deep Dive */}
      {deepDiveText ? (
        <div className="reveal-on-scroll" style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'rgba(66,133,244,0.05)', 
          border: '1px solid rgba(66,133,244,0.2)', 
          borderRadius: '15px' 
        }}>
          <div style={{ color: '#4285F4', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6298a2f2444.svg" width="16" alt="" />
            Gemini Expert Deep-Dive
          </div>
          <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6', fontStyle: 'italic' }}>{deepDiveText}</p>
        </div>
      ) : (
        <div style={{ marginTop: '30px', padding: '15px', color: '#666', fontSize: '0.8rem', textAlign: 'center' }}>
          Consulting Gemini for expert analysis...
        </div>
      )}

      {/* Timeline Steps */}
      {currentPhase.info.steps && (
        <div className="phase-timeline">
          <h4 className="timeline-header">Timeline & Steps</h4>
          <div className="timeline-track">
            {currentPhase.info.steps.map((step: { title: string; desc: string }, idx: number) => (
              <div key={idx} className="timeline-step">
                <div className="timeline-dot" style={{ borderColor: currentPhase.color, background: currentPhase.bg }}></div>
                <div className="timeline-content">
                  <div className="step-title" style={{ color: currentPhase.color }}>{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fact-pills">
        {currentPhase.info.pills.map((p, i) => (
          <span key={i} className={`fact-pill ${i < 2 ? 'highlight' : ''}`}>{p}</span>
        ))}
      </div>
      <button className="info-quiz-btn" onClick={onStartQuiz}>⚡ Take the Quiz</button>
    </div>
  );
};

export default React.memo(InfoPanel);
