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
                <button className='pk-power-btn'>Grass</button>
                <button className='pk-power-btn'>Poison</button>
              </div>
              <p className='pk-num'>#001</p>
            </div>
            <div className='pk-section-two'>
              <div className='pk-info'>
                <h3 className='pk-info-name'>Bulbasaur</h3>
                <p className='pk-info-desc'>
                  A strange seed was planted on its back at birth. the plant
                  sprouts and grows with this pokémon.
                </p>
                <button className='pk-info-btn'>Know More</button>
              </div>
              <img
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
                alt='#'
                className='pk-img'
              />
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
