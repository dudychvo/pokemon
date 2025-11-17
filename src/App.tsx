import { useState, useEffect } from 'react';
import axios from 'axios';

import type {
  PokemonAPIResult,
  PokemonAPIResultURL,
} from './types/PokemonAPIResult.ts';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import pokemonBall from './assets/pokemon-ball.svg';
import logo from './assets/logo.png';
import searchImg from './assets/search.svg';

import './App.scss';

function App() {
  const [pokemonsData, setPokemonsData] = useState<PokemonAPIResult | null>(
    null
  );
  const [inputValue, setInputValue] = useState(''); // current input
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30'
      );
      setPokemonsData(result.data);
    };
    fetch();
  }, []);

  const filteredPokemons = pokemonsData?.results.filter(
    (p: PokemonAPIResultURL) =>
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayPokemons = search ? filteredPokemons : pokemonsData?.results;

  return (
    <div className='container'>
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-one' />
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-two' />
      <img src={pokemonBall} alt='#' className='pokemon-ball p-b-three' />
      <main>
        <header>
          <img
            src={logo}
            alt='#'
            className='logo'
            onClick={() => {
              setInputValue('');
              setSearch('');
            }}
          />
          <nav>
            <input
              type='text'
              placeholder='Search...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => setSearch(inputValue)}>
              <img src={searchImg} alt='#' className='search' />
            </button>
          </nav>
        </header>
        <div className='grid'>
          {displayPokemons?.map((p: PokemonAPIResultURL) => (
            <PokemonCard key={p.url} url={p.url} />
          ))}
          {!displayPokemons?.length && <p>No Pokémon found</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
