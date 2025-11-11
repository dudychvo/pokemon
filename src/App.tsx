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
            <input type='text' placeholder='Search eg, ditto or pikachu...' />
            <button>
              <img src={search} alt='#' className='search' />
            </button>
          </nav>
        </header>
        <div></div>
      </main>
    </div>
  );
}

export default App;
