import { useEffect, useState, useCallback, useRef } from 'react';

interface SpotlightProps {
  memberPositions: { x: number; y: number }[];
}

export default function Spotlight({ memberPositions }: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isUserControlling, setIsUserControlling] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(0);
  const [targetSize, setTargetSize] = useState(350);
  const [phase, setPhase] = useState<'waiting' | 'slapping' | 'ready'>('waiting');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoMoveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentTargetRef = useRef(0);

  // Calculate target size based on screen
  useEffect(() => {
    const updateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setTargetSize(minDimension * 0.45);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // THE BIG SLAP - runs once on mount
  useEffect(() => {
    // Start position at center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setPosition({ x: centerX, y: centerY });

    // Slap sequence
    const timer1 = setTimeout(() => {
      setPhase('slapping');
      setSpotlightSize(targetSize * 1.5); // Overshoot
    }, 300);

    const timer2 = setTimeout(() => {
      setSpotlightSize(targetSize); // Settle
      setPhase('ready');
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [targetSize]);

  // Move to next team member
  const moveToNextMember = useCallback(() => {
    if (memberPositions.length === 0) return;
    currentTargetRef.current = (currentTargetRef.current + 1) % memberPositions.length;
    const target = memberPositions[currentTargetRef.current];
    if (target) {
      setPosition({ x: target.x, y: target.y });
    }
  }, [memberPositions]);

  // Start cycling through members once ready
  useEffect(() => {
    if (phase === 'ready' && !isUserControlling && memberPositions.length > 0) {
      // Move to first member immediately
      moveToNextMember();

      // Then continue cycling
      autoMoveRef.current = setInterval(() => {
        moveToNextMember();
      }, 2500);
    }

    return () => {
      if (autoMoveRef.current) {
        clearInterval(autoMoveRef.current);
      }
    };
  }, [phase, isUserControlling, memberPositions, moveToNextMember]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (phase !== 'ready') return;

    setIsUserControlling(true);
    setPosition({ x: e.clientX, y: e.clientY });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsUserControlling(false);
    }, 2500);
  }, [phase]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  // Transition style
  const getTransition = () => {
    if (phase === 'slapping') {
      return 'background 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
    }
    if (isUserControlling) {
      return 'none';
    }
    return 'background 1s ease-out';
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: spotlightSize === 0
            ? 'rgba(0, 0, 0, 1)'
            : `radial-gradient(circle ${spotlightSize}px at ${position.x}px ${position.y}px,
                transparent 0%,
                transparent 25%,
                rgba(0, 0, 0, 0.6) 45%,
                rgba(0, 0, 0, 0.95) 70%,
                rgba(0, 0, 0, 1) 100%)`,
          transition: getTransition(),
        }}
      />

      {/* Flash on slap */}
      {phase === 'slapping' && (
        <div
          className="fixed inset-0 pointer-events-none z-40 animate-pulse"
          style={{
            background: `radial-gradient(circle ${spotlightSize}px at ${position.x}px ${position.y}px,
              rgba(255, 255, 255, 0.2) 0%,
              transparent 60%)`,
          }}
        />
      )}
    </>
  );
}
