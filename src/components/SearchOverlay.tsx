import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const events = [
  { name: 'MIS Night', description: 'Network with industry professionals in Management Information Systems', url: '#' },
  { name: 'HelloHacks', description: 'Beginner-friendly hackathon to kickstart your tech journey', url: '#' },
  { name: 'UXOpen', description: 'Design competition focused on user experience and product thinking', url: '#' },
  { name: 'KickStart', description: 'Launch your startup ideas with mentorship and resources', url: '#' },
  { name: 'Blueprint', description: 'Learn the fundamentals of product management and strategy', url: '#' },
  { name: 'TechStrat', description: 'Case competition bridging technology and business strategy', url: '#' },
  { name: 'ProduHacks', description: 'Build products that solve real-world problems', url: '#' },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#1c1c1c] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
                <span className="text-white text-xl font-light tracking-wider">Team Grey</span>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4">
                <a
                  href="https://ubcbiztech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center px-6 py-2.5 border border-white text-white text-sm
                           hover:bg-white hover:text-black transition-all duration-300"
                >
                  Get Started
                </a>

                <button
                  onClick={onClose}
                  className="p-2 text-white hover:opacity-70 transition-opacity"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-2 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Search content */}
          <motion.div
            className="px-6 pt-16 pb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Search input */}
              <div className="border-b border-white/30 pb-2 mb-16">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Start typing to search"
                  className="w-full bg-transparent text-white text-xl font-light
                           placeholder:text-white/40 outline-none"
                />
              </div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {query.length > 0 ? (
                  /* Show results when typing */
                  <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-20">
                    {/* Left column */}
                    <div>
                      <p className="text-white/50 text-sm mb-4">
                        Bro we don't have a backend
                      </p>
                      <h2 className="text-white text-4xl md:text-5xl font-light leading-tight">
                        Here are our<br />events though
                      </h2>
                    </div>

                    {/* Right column - Results list */}
                    <div className="space-y-8">
                      {events.map((event, index) => (
                        <motion.a
                          key={event.name}
                          href={event.url}
                          className="block group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-xl font-normal group-hover:underline">
                              {event.name}
                            </span>
                            <svg
                              className="w-4 h-4 text-white transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                            </svg>
                          </div>
                          <p className="text-white/50 text-sm">
                            {event.description}
                          </p>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Show popular searches by default */
                  <div>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                      <span className="text-white/40 text-xs uppercase tracking-widest">
                        Our Events
                      </span>
                      {events.map((event) => (
                        <a
                          key={event.name}
                          href={event.url}
                          className="text-white text-lg font-light underline underline-offset-4
                                   hover:text-white/70 transition-colors"
                        >
                          {event.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
