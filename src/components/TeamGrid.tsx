import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TeamMember from './TeamMember';
import ShuffleButton from './ShuffleButton';
import { teamMembers, type TeamMember as TeamMemberType } from '../data/team';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface TeamGridProps {
  onPositionsUpdate: (positions: { x: number; y: number }[]) => void;
}

export default function TeamGrid({ onPositionsUpdate }: TeamGridProps) {
  const [members, setMembers] = useState<TeamMemberType[]>(teamMembers);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleShuffle = useCallback(() => {
    setMembers((prev) => shuffleArray(prev));
  }, []);

  // Update card positions for spotlight
  useEffect(() => {
    const updatePositions = () => {
      const positions = cardRefs.current
        .filter((ref): ref is HTMLDivElement => ref !== null)
        .map((ref) => {
          const rect = ref.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        });
      onPositionsUpdate(positions);
    };

    // Update after a short delay to let layout settle
    const timer = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [members, onPositionsUpdate]);

  return (
    <div className="relative z-10 flex flex-col items-center px-8 pb-20">
      {/* Team members grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-16 mb-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence mode="popLayout">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              layout
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
              }}
            >
              <TeamMember member={member} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Shuffle button */}
      <ShuffleButton onClick={handleShuffle} />
    </div>
  );
}
