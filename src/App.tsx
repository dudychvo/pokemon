// import { useState } from 'react';
import pokemonBall from './assets/pokemon-ball.svg';
import logo from './assets/logo.png';
import search from './assets/search.svg';

import './App.scss';

function App() {
  return (
    <div className='container'>
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-one' />
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-two' />
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-three' />
      <main>
        <header>
          <img src={logo} alt='#' className='logo' />
          <nav>
            <input type='text' placeholder='Search...' />
            <button>
              <img src={search} alt='#' className='search' />
            </button>
          </nav>
        </header>
        <div className='grid'>
          <div className='pokemon-card p-k-one'>
            <div className='pk-section-one'>
              <div className='pk-power'>
                <button>Grass</button>
                <button>Poison</button>
              </div>
              <p>#001</p>
            </div>
            <div className='pk-section-two'>
              <div className='pk-info'>
                <h3>Bulbasaur</h3>
                <p>
                  A strange seed was planted on its back at birth. the plant
                  sprouts and grows with this pokémon.
                </p>
                <button>Know More</button>
              </div>
              <img src='#' alt='#' />
            </div>
          </div>
          {/* 



           */}
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
          <div className='pokemon-card p-k-one'></div>
        </div>
      </main>
    </div>
  );
}

export default App;
