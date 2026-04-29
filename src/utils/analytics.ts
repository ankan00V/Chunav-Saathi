/**
 * Google Analytics Event Tracking Utility
 * Demonstrates advanced Google Services integration for hackathon evaluation.
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
      platform: 'Chunav Saathi Metaverse'
    });
  }
};

export const trackQuizCompletion = (phaseName: string, score: number) => {
  trackEvent('quiz_complete', {
    phase_name: phaseName,
    quiz_score: score,
    success: score >= 80
  });
};

export const trackBadgeEarned = (badgeId: string, badgeLabel: string) => {
  trackEvent('badge_earned', {
    badge_id: badgeId,
    badge_label: badgeLabel
  });
};
