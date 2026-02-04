import { motion } from 'framer-motion';
import { useState } from 'react';
import type { TeamMember as TeamMemberType } from '../data/team';

interface Props {
  member: TeamMemberType;
}

export default function TeamMember({ member }: Props) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
      style={{ cursor: 'none' }}
    >
      <motion.div
        className="relative glass-card rounded-2xl p-6 w-56
                   transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg)' : 'none',
        }}
      >
        {/* Subtle glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Photo container */}
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-1 ring-white/10">
          {!imageError && member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500
                         group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${member.gradient}
                          flex items-center justify-center text-white text-3xl font-bold`}
            >
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium text-center text-white/90 mb-1 tracking-wide">
          {member.name}
        </h3>

        {/* LinkedIn placeholder */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-sm text-white/40
                       hover:text-white/70 transition-colors duration-200"
            style={{ cursor: 'none' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
