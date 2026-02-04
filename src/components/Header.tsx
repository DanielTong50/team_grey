import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="relative z-10 pt-16 pb-12 px-6 text-center"
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
        style={{
          color: 'white',
          textShadow: '0 0 60px rgba(255,255,255,0.3)',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        Team Grey
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-white/40 mb-8 max-w-md mx-auto font-light tracking-wide"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        Building innovative solutions together
      </motion.p>

      <motion.a
        href="https://ubcbiztech.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                   text-sm font-medium text-white/60 hover:text-white
                   border border-white/10 hover:border-white/20
                   transition-all duration-300 hover:scale-105"
        style={{ cursor: 'none' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        UBC BizTech
      </motion.a>
    </motion.header>
  );
}
