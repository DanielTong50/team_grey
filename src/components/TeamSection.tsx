import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamMembers, type TeamMember as TeamMemberType } from '../data/team';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function TeamCard({ member, index }: { member: TeamMemberType; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden">
        {/* Image */}
        <div className="aspect-[3/4] bg-neutral-900 overflow-hidden">
          {!imageError && member.photo ? (
            <motion.img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0
                       transition-all duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${member.gradient} opacity-60
                          flex items-center justify-center`}>
              <span className="text-white text-4xl font-light">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-white text-lg font-light tracking-wide">
          {member.name}
        </h3>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-white/40 text-sm
                     hover:text-white transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMemberType[]>(teamMembers);

  const handleShuffle = useCallback(() => {
    setMembers((prev) => shuffleArray(prev));
  }, []);

  return (
    <section className="relative bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-4">
            The Team
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-light tracking-tight">
            Meet Our Members
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {members.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Shuffle button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 text-white/60
                     hover:border-white/40 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Shuffle
          </button>
        </motion.div>
      </div>
    </section>
  );
}
