import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

/**
 * Premium CountUp Animation with 'Live Pulse' effect.
 * Demonstrates high-fidelity UI engineering and performance optimization.
 */
const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const currentCount = progress * end;
          setCount(currentCount);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsPulsing(true);
          }
        };
        requestAnimationFrame(animate);
      } else {
        setCount(0);
        setIsPulsing(false);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  useEffect(() => {
    if (!isPulsing) return;
    const pulseInterval = setInterval(() => {
      setCount(prev => {
        const drift = (Math.random() - 0.4) * (end * 0.0005);
        return Math.max(end * 0.99, prev + drift);
      });
    }, 2000);
    return () => clearInterval(pulseInterval);
  }, [isPulsing, end]);

  const formatted = end % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1);
  return <div ref={countRef}>{formatted}{suffix}</div>;
};

export default React.memo(CountUp);
