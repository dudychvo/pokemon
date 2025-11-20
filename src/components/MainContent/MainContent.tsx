import { useState, useEffect } from 'react';
import axios from 'axios';

import type {
  PokemonAPIResult,
  PokemonAPIResultURL,
} from '../../types/PokemonAPIResult.ts';
import { PokemonCard } from '../PokemonCard/PokemonCard.tsx';
import { Footer } from '../Footer/Footer.tsx';

import logoImg from '../../assets/logo-img.png';
import headerCloud from '../../assets/header-cloud.png';
import searchBg from '../../assets/search-bg.png';
import btnBg from '../../assets/btn-bg.png';
import btnImg from '../../assets/btn-img.png';

import './MainContent.scss';

const BATCH_SIZE = 18;

export const MainContent = () => {
  const [pokemonsData, setPokemonsData] = useState<PokemonAPIResult | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18'
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
  }, [allPokemons, visibleCount]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [search]);

  return (
    <div className='container'>
      <div className='headerContainer'>
        <header>
          <img src={headerCloud} alt='' className='headerCloud' />
          <img
            src={logoImg}
            alt='#'
            className='logoImg'
            onClick={() => {
              setInputValue('');
              setSearch('');
              setVisibleCount(BATCH_SIZE);
            }}
          />
        </header>
        <nav>
          <img src={searchBg} alt='#' className='searchBg' />
          <input
            type='text'
            placeholder='Search...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div
            className='btn'
            onClick={() => {
              setSearch(inputValue);
            }}
          >
            <img src={btnBg} alt='#' className='btnBg' />
            <img src={btnImg} alt='#' className='btnImg' />
          </div>
        </nav>
      </div>
      <div className='grid'>
        {displayPokemons?.map((p: PokemonAPIResultURL) => (
          <PokemonCard key={p.url} url={p.url} />
        ))}
        {!displayPokemons?.length && <p>No Pokémon found</p>}
      </div>
      <Footer />
    </div>
  );
};
