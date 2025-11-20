import { useState, useEffect } from 'react';

import { MainContent } from './components/MainContent/MainContent.tsx';
import { PokeballPreloader } from './components/Preloader/PokeballPreloader';

import './App.scss';

function App() {
  const [loading, setLoading] = useState(true); // tracks loading state
  const [showPreloader, setShowPreloader] = useState(true); // keeps preloader mounted for fade-out

  useEffect(() => {
    // simulate loading (API or assets)
    const timer = setTimeout(() => {
      setLoading(false); // trigger fade-out
      setTimeout(() => setShowPreloader(false), 800); // remove preloader after fade
    }, 2000); // 2 seconds loading simulation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='app'>
      {showPreloader && (
        <div className={`preloader-wrapper ${loading ? 'visible' : 'hidden'}`}>
          <PokeballPreloader visible={true} />
        </div>
      )}
      <div className={`main-wrapper ${loading ? 'hidden' : 'visible'}`}>
        <MainContent />
      </div>
    </div>
  );
}

export default App;
