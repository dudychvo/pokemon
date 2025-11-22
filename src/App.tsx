import { useState, useEffect } from 'react';

import { MainContent } from './components/MainContent/MainContent.tsx';
import { PokeballPreloader } from './components/Preloader/PokeballPreloader';

import scrollUp from './assets/scroll-up.png';

import './App.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowPreloader(false), 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  //
  //
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // initial run

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    btn.onclick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  }, []);
  //
  //
  return (
    <div className='app' id='app'>
      {showPreloader && (
        <div className={`preloader-wrapper ${loading ? 'visible' : 'hidden'}`}>
          <PokeballPreloader visible={true} />
        </div>
      )}
      <div className={`main-wrapper ${loading ? 'hidden' : 'visible'}`}>
        <MainContent />
      </div>
      <div
        id='scrollTopBtn'
        className={`scrollTopWrapper ${
          showScrollBtn ? 'show' : 'hide'
        }`}
      >
        <img
          src={scrollUp}
          alt='#'
          className={`scrollTopImg ${showScrollBtn ? 'show' : 'hide'}`}
        />
      </div>
    </div>
  );
}

export default App;
