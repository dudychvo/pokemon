import { useState, useEffect } from 'react';
import axios from 'axios';

import type { PokemonUrl } from './types/PokemonUrl.ts';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import pokemonBall from './assets/pokemon-ball.svg';
import logo from './assets/logo.png';
import search from './assets/search.svg';

import './App.scss';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      setPokemonsData(result.data.results);
    };
    fetch();
  }, []);

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
          {pokemonsData.map((el: PokemonUrl) => (
            <PokemonCard url={el.url} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
