import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';

export default function App() {
  return (
    <div className="relative bg-black min-h-screen">
      <Suspense fallback={null}>
        <HeroSection />
        <TeamSection />

        {/* Footer */}
        <footer className="bg-black py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white/40 text-sm">
              Team Grey &middot; UBC BizTech &middot; Vibe coded by DTong
            </p>
          </div>
        </footer>
      </Suspense>
    </div>
  );
}
