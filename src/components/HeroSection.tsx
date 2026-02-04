import { motion } from 'framer-motion';
import { useState } from 'react';
import SearchOverlay from './SearchOverlay';

export default function HeroSection() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/video-poster.jpg"
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            video.currentTime = 4;
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video.duration - video.currentTime <= 5) {
              video.currentTime = 4;
            }
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Top Banner */}
      {bannerOpen && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-30 bg-white text-black py-3 px-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm">
              Check out our{' '}
              <a href="https://github.com/DanielTong50/team_grey" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">
                repo
              </a>
            </p>
            <button
              onClick={() => setBannerOpen(false)}
              className="text-black hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className={`absolute left-0 right-0 z-20 px-6 py-4 transition-all duration-300 ${bannerOpen ? 'top-14' : 'top-4'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Frosted glass background */}
          <div className="absolute -inset-x-6 -inset-y-4 bg-white/10 backdrop-blur-md -z-10" />

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
            <span className="text-white text-xl font-light tracking-wider">Team Grey</span>
          </motion.div>

          {/* Right nav */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://ubcbiztech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-6 py-2.5 border border-white text-white text-sm
                       hover:bg-white hover:text-black transition-all duration-300"
            >
              UBC BIZTECH
            </a>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:opacity-70 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white hover:opacity-70 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
              </svg>
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="text-white font-light leading-[1.1]">
            <span className="block text-[clamp(2rem,7vw,5.5rem)] tracking-tight">
              Gonna Win All the Challenges
            </span>
            <span className="block text-[clamp(2rem,7vw,5.5rem)] tracking-tight">
              and Mog at Retreat
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>
  );
}
