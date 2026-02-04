import { motion } from 'framer-motion';

interface Props {
  onClick: () => void;
}

export default function ShuffleButton({ onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      className="relative group px-8 py-4 rounded-full
                 text-white/70 hover:text-white font-medium text-lg
                 border border-white/10 hover:border-white/25
                 transition-all duration-300 hover:scale-105"
      style={{ cursor: 'none' }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: '0 0 40px rgba(255,255,255,0.1)',
        }}
      />

      {/* Button content */}
      <span className="relative flex items-center gap-3">
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </motion.svg>
        Shuffle Team
      </span>
    </motion.button>
  );
}
