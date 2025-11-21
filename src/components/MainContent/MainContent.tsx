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

export const MainContent = () => {
  const [pokemonsData, setPokemonsData] = useState<PokemonAPIResult | null>(
    null
  );
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState<string>('');
  const BATCH_SIZE = 18;
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
        <h1 className='sr-only'>Pokémon Dashboard</h1>
        <header>
          <img
            src={headerCloud}
            alt='Header background cloud'
            className='headerCloud'
          />
          <img
            src={logoImg}
            alt='Pokémon logo'
            className='logoImg'
            onClick={() => {
              setInputValue('');
              setSearch('');
              setVisibleCount(BATCH_SIZE);
            }}
          />
        </header>
        <nav>
          <img
            src={searchBg}
            alt='Search background cloud'
            className='searchBg'
          />
          <input
            type='text'
            placeholder='Search...'
            alt='Search'
            aria-label='Search'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div
            className='btn'
            onClick={() => {
              setSearch(inputValue);
            }}
          >
            <img src={btnBg} alt='Search button' className='btnBg' />
            <img src={btnImg} alt='Search icon' className='btnImg' />
          </div>
        </nav>
      </div>
      <div className='grid'>
        {displayPokemons?.map((p: PokemonAPIResultURL) => (
          <PokemonCard key={p.url} url={p.url} />
        ))}
        {!displayPokemons?.length && (
          <div className='notFound'>
            <p>No Pokémon found</p>
            <img
              src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczd4b3U1NWU1dDE2cmwzcGNucXc0c21oaGltems3dnl0dTFsZW8xOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6nWhy3ulBL7GSCvKw6/giphy.gif'
              alt='No Pokémon found GIF'
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
