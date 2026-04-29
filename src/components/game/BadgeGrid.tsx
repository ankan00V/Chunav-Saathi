import React from 'react';
import type { Badge } from '../../types/game';

interface BadgeGridProps {
  badges: Badge[];
  earnedBadges: string[];
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, earnedBadges }) => {
  return (
    <div className="badges-section">
      <div className="badges-title">🏅 Your Badges</div>
      <div className="badges-row">
        {badges.map((b) => {
          const earned = earnedBadges.includes(b.id);
          return (
            <div key={b.id} className={`badge-item ${earned ? 'earned' : ''}`}>
              <span className="badge-emoji">{b.emoji}</span>
              <span className="badge-label">{b.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default React.memo(BadgeGrid);
