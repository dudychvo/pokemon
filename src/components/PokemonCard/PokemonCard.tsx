import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import type { PokemonInfo, PokemonInfoURL } from '../../types/PokemonInfo';

import cardBg from '../../assets/card-bg.png';

import './PokemonCard.scss';

export const PokemonCard = ({ url }: PokemonInfoURL) => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const abilityOneRef = useRef<HTMLButtonElement>(null);
  const abilityTwoRef = useRef<HTMLButtonElement>(null);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(url);
      setPokemon(result.data);
    };
    fetch();
  }, [url]);

  useEffect(() => {
    if (!pokemon || !nameRef.current) return;

    const textLength = pokemon.name.length;
    nameRef.current.classList.add(
      textLength >= 10 ? 'pk-name-wide' : 'pk-name-narrow'
    );
  }, [pokemon]);

  const pokemonName = pokemon?.name.replace(/^./, (c) => c.toUpperCase());
  const getAbilityName = (abilityIndex: number) => {
    return pokemon?.abilities?.[abilityIndex]?.ability.name.replace(/^./, (c) =>
      c.toUpperCase()
    );
  };

  useEffect(() => {
    if (!pokemon) return;

    // Ability 1
    if (abilityOneRef.current && pokemon.abilities[0]?.ability?.name) {
      const length = pokemon.abilities[0].ability.name.length;
      abilityOneRef.current.classList.add(
        length > 9 ? 'pk-ablt-one-wide' : 'pk-ablt-one-narrow'
      );
    }

    // Ability 2
    if (abilityTwoRef.current && pokemon.abilities[1]?.ability?.name) {
      const length = pokemon.abilities[1].ability.name.length;
      abilityTwoRef.current.classList.add(
        length > 20 ? 'pk-ablt-two-wide' : 'pk-ablt-two-narrow'
      );
    }
  }, [pokemon]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const w = e.currentTarget.naturalWidth;
    e.currentTarget.classList.add(w > 87 ? 'pk-img-wide' : 'pk-img-narrow');
  };

  return (
    <>
      <div className='pk-container'>
        <img src={cardBg} alt='#' className='pk-bg' />
        <div className='pokemon'>
          <p className='pk-num'>{'#' + pokemon?.id}</p>
          {getAbilityName(0) && (
            <button ref={abilityOneRef} className='pk-ablt-one'>
              {getAbilityName(0)}
            </button>
          )}
          {getAbilityName(1) && (
            <button ref={abilityTwoRef} className='pk-ablt-two'>
              {getAbilityName(1)}
            </button>
          )}
          <h2 ref={nameRef}>{pokemonName}</h2>
          <button className='pk-more'>Know More</button>
          <img
            src={
              showFront
                ? pokemon?.sprites.other?.showdown?.front_default
                : pokemon?.sprites.other?.showdown?.back_default
            }
            alt=''
            onLoad={handleImageLoad}
            onClick={() => setShowFront((prev) => !prev)}
          />
        </div>
      </div>
    </>
  );
};
