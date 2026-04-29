import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BadgeGrid from '../components/game/BadgeGrid';
import type { Badge } from '../types/game';


describe('BadgeGrid Component', () => {
  const mockBadges: Badge[] = [
    { id: 'badge1', label: 'Badge One', emoji: '🥇' },
    { id: 'badge2', label: 'Badge Two', emoji: '🥈' }
  ];

  it('renders correctly with earned badges', () => {
    render(<BadgeGrid badges={mockBadges} earnedBadges={['badge1']} />);
    
    expect(screen.getByText('🏅 Your Badges')).toBeDefined();
    expect(screen.getByText('Badge One')).toBeDefined();
    
    const badge1 = screen.getByLabelText('Badge One');
    expect(badge1).toBeDefined();
    expect(badge1.parentElement?.className).toContain('earned');
  });

  it('renders locked badges correctly', () => {
    render(<BadgeGrid badges={mockBadges} earnedBadges={[]} />);
    
    const badge1 = screen.getByLabelText('Badge One');
    expect(badge1.parentElement?.className).not.toContain('earned');
  });
});
