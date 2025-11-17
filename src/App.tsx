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

const BATCH_SIZE = 18;

function App() {
  const [pokemonsData, setPokemonsData] = useState<PokemonAPIResult | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=501'
      );
      setPokemonsData(result.data);
    };
    fetch();
  }, []);

  const filteredPokemons = pokemonsData?.results.filter(
    (p: PokemonAPIResultURL) =>
      p.name.toLowerCase().startsWith(search.toLowerCase())
  );
  const allPokemons = search ? filteredPokemons : pokemonsData?.results;
  const displayPokemons = allPokemons?.slice(0, visibleCount);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        if (allPokemons && visibleCount < allPokemons.length) {
          setVisibleCount((prev) =>
            Math.min(prev + BATCH_SIZE, allPokemons.length)
          );
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allPokemons, visibleCount]); // include both dependencies

  // Reset visibleCount on new search
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search]);

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
              setVisibleCount(BATCH_SIZE);
            }}
          />
          <nav>
            <input
              type='text'
              placeholder='Search...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={() => {
                setSearch(inputValue);
              }}
            >
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
