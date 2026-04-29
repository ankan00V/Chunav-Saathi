import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


// Simple component for testing
const SimpleBadge = ({ label }: { label: string }) => (
  <div data-testid="badge">{label}</div>
);

describe('SimpleBadge Component', () => {
  it('renders the badge label correctly', () => {
    render(<SimpleBadge label="ECI Expert" />);
    expect(screen.getByTestId('badge')).toHaveTextContent('ECI Expert');
  });
});
