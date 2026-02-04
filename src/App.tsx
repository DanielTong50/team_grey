import { useState, useCallback } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import TeamGrid from './components/TeamGrid';
import Spotlight from './components/Spotlight';

export default function App() {
  const [memberPositions, setMemberPositions] = useState<{ x: number; y: number }[]>([]);

  const handlePositionsUpdate = useCallback((positions: { x: number; y: number }[]) => {
    setMemberPositions(positions);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Header />
        <main>
          <TeamGrid onPositionsUpdate={handlePositionsUpdate} />
        </main>
      </div>
      <Spotlight memberPositions={memberPositions} />
    </div>
  );
}
