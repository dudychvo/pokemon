import { useState, useEffect } from 'react';
import axios from 'axios';

import type { PokemonInfo } from '../../types/PokemonInfo'; // path relative to the file
import './PokemonCard.scss';

export const PokemonCard = (props: PokemonInfo) => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);

  const pokemonName = pokemon?.name?.replace(/^./, (c) => c.toUpperCase());

  const getAbilityName = (abilityIndex: number) => {
    return pokemon?.abilities?.[abilityIndex]?.ability?.name?.replace(
      /^./,
      (c) => c.toUpperCase()
    );
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(props.url);
      setPokemon(result.data);
    };
    fetch();
  }, [props.url]);

  console.log(pokemon);

  return (
    <>
      <div className='pokemon-card p-k-one'>
        <div className='pk-section-one'>
          <div className='pk-power'>
            {getAbilityName(0) && (
              <button className='pk-power-btn'>{getAbilityName(0)}</button>
            )}
            {getAbilityName(1) && (
              <button className='pk-power-btn'>{getAbilityName(1)}</button>
            )}
          </div>
          <p className='pk-num'>#001</p>
        </div>
        <div className='pk-section-two'>
          <div className='pk-info'>
            <h3 className='pk-info-name'>{pokemonName}</h3>
            <p className='pk-info-desc'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <button className='pk-info-btn'>Know More</button>
          </div>
          <img
            src={pokemon?.sprites?.other?.['official-artwork']?.front_default}
            alt='#'
            className='pk-img'
          />
        </div>
      </div>
    </>
  );
};
