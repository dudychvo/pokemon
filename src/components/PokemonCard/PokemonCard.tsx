import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogPanel } from '@headlessui/react';

import type { PokemonInfo, PokemonInfoURL } from '../../types/PokemonInfo';

import cardBg from '../../assets/card-bg.png';

import './PokemonCard.scss';

type CryType = 'latest' | 'legacy';

export const PokemonCard = ({ url }: PokemonInfoURL) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [showFront, setShowFront] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPokemon = async (): Promise<PokemonInfo> => {
    const result = await axios.get(url);
    return result.data;
  };

  const {
    isLoading,
    error,
    data: pokemon,
  } = useQuery({
    queryKey: ['pokemon', url],
    queryFn: fetchPokemon,
  });

  useEffect(() => {
    if (!pokemon || !nameRef.current) return;

    const textLength = pokemon.name.length;
    nameRef.current.classList.add(
      textLength >= 10 ? 'pk-name-wide' : 'pk-name-narrow',
    );
  }, [pokemon]);

  const pokemonName = pokemon?.name.replace(/^./, (c) => c.toUpperCase());

  const getTypeName = (typeIndex: number) => {
    return pokemon?.types?.[typeIndex]?.type.name.replace(/^./, (c) =>
      c.toUpperCase(),
    );
  };
  const typeOne = getTypeName(0)?.toLowerCase();
  const typeTwo = getTypeName(1)?.toLowerCase();

  const getAbilityName = (abilityIndex: number) => {
    return pokemon?.abilities?.[abilityIndex]?.ability.name.replace(/^./, (c) =>
      c.toUpperCase(),
    );
  };

  const getCryName = (cry: CryType) => {
    return pokemon?.cries?.[cry];
  };
  const urlOne = getCryName('latest');
  const urlTwo = getCryName('legacy');

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const w = e.currentTarget.naturalWidth;
    e.currentTarget.classList.add(w > 87 ? 'pk-img-wide' : 'pk-img-narrow');
  };

  if (isLoading) return <div className='loading'>Loading...</div>;
  if (error) return <div className='error'>Error fetching data</div>;

  return (
    <>
      <div className='pk-container'>
        <img src={cardBg} className='pk-bg' alt='' aria-hidden='true' />
        <div className='pokemon'>
          <h2 className='pk-num'>{'#' + pokemon?.id}</h2>
          {getTypeName(0) && (
            <p className={`pk-type-one type-${typeOne}`}>{getTypeName(0)}</p>
          )}
          {getTypeName(1) && (
            <p className={`pk-type-two type-${typeTwo}`}>{getTypeName(1)}</p>
          )}
          <h2 ref={nameRef}>{pokemonName}</h2>
          <button className='pk-more' onClick={() => setIsOpen(true)}>
            Know More
          </button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className='modal'
          >
            <div className='overlay' aria-hidden='true' />
            <DialogPanel className='modal-panel'>
              <div className='pk-m-section-one'>
                <div className='pk-m-info'>
                  <div className='pk-m-num-container'>
                    <p className='pk-m-num-title'>Pokemon num:</p>
                    <p className='pk-m-num'>{'#' + pokemon?.id}</p>
                  </div>
                  <div className='pk-m-name-container'>
                    <p className='pk-m-name-title'>Pokemon name:</p>
                    <p className='pk-m-name'>{pokemonName}</p>
                  </div>
                </div>
                <div className='pk-m-img-container'>
                  <img
                    className='pk-m-img'
                    src={
                      showFront
                        ? pokemon?.sprites.other?.showdown?.front_default
                        : pokemon?.sprites.other?.showdown?.back_default
                    }
                    alt='Pokemon image'
                    onLoad={handleImageLoad}
                    onClick={() => setShowFront((prev) => !prev)}
                  />
                </div>
                <div className='pk-m-cry-container'>
                  <p className='pk-m-cry'>Cries:</p>
                  <div className='pk-m-cries'>
                    {getCryName('latest') && (
                      <button
                        className='pk-m-cry-one'
                        onClick={() => new Audio(urlOne).play()}
                      >
                        ♪
                      </button>
                    )}
                    {getCryName('legacy') && (
                      <button
                        className='pk-m-cry-two'
                        onClick={() => new Audio(urlTwo).play()}
                      >
                        ♫
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className='pk-m-section-two'>
                <div className='pk-m-type-container'>
                  <p className='pk-m-type-title'>Type:</p>
                  <div className='pk-m-types'>
                    {getTypeName(0) && (
                      <p className={`pk-m-type-one type-${typeOne}`}>
                        {getTypeName(0)}
                      </p>
                    )}
                    {getTypeName(1) && (
                      <p className={`pk-m-type-two type-${typeTwo}`}>
                        {getTypeName(1)}
                      </p>
                    )}
                  </div>
                </div>
                <div className='pk-m-ability-container'>
                  <p className='pk-m-ability-title'>Abilities:</p>
                  <div className='pk-m-abilities'>
                    {getAbilityName(0) && (
                      <p className={`pk-m-ability-one`}>{getAbilityName(0)}</p>
                    )}
                    {getAbilityName(1) && (
                      <p className={`pk-m-ability-two`}>{getAbilityName(1)}</p>
                    )}
                  </div>
                </div>
                <p className='pk-m-body-m-container'>
                  <p className='pk-m-body-m-title'>Body-metrics:</p>
                  <div className='pk-m-body-m'>
                    <p className='pk-m-base-exp'>
                      <span className='base-exp'>Base-exp: </span>
                      {pokemon?.base_experience}
                    </p>
                    <div className='pk-m-body-base-m'>
                      <p className={'pk-m-weight'}>
                        <span className='Weight'>Weight: </span>
                        {pokemon?.weight}
                      </p>
                      <p className={'pk-m-height'}>
                        <span className='height'>Height: </span>
                        {pokemon?.height}
                      </p>
                    </div>
                  </div>
                </p>

                <div className='pk-m-stats-container'>
                  <p className='pk-m-stats-title'>Stats:</p>
                  <div className='pk-m-stats'>
                    <div className='pk-m-stats-one'>
                      <p className='pk-m-hp'>
                        <span>HP: </span>
                        {pokemon?.stats[0].base_stat}
                      </p>
                      <p className={'pk-m-attack'}>
                        <span>ATK: </span>
                        {pokemon?.stats[1].base_stat}
                      </p>
                      <p className={'pk-m-defence'}>
                        <span>DEF: </span>
                        {pokemon?.stats[2].base_stat}
                      </p>
                    </div>
                    <div className='pk-m-stats-two'>
                      <p className={'pk-m-s-attack'}>
                        <span>S-ATK: </span>
                        {pokemon?.stats[3].base_stat}
                      </p>
                      <p className={'pk-m-s-defence'}>
                        <span>S-DEF: </span>
                        {pokemon?.stats[4].base_stat}
                      </p>
                      <p className={'pk-m-speed'}>
                        <span>Speed: </span>
                        {pokemon?.stats[5].base_stat}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
          <img
            src={
              showFront
                ? pokemon?.sprites.other?.showdown?.front_default
                : pokemon?.sprites.other?.showdown?.back_default
            }
            alt='Pokemon image'
            onLoad={handleImageLoad}
            onClick={() => setShowFront((prev) => !prev)}
          />
        </div>
      </div>
    </>
  );
};

{
  /* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='modal'>
  <div className='overlay' aria-hidden='true' />
  <div className='modal-wrapper'>
    <DialogPanel className='modal-panel'>
      <DialogTitle className='pk-m-name'>{pokemonName}</DialogTitle>
      <Description>
        <h2 className='pk-m-num'>{'#' + pokemon?.id}</h2>
      </Description>
      <p className='pk-m-cry'>Cries:</p>
      {getCryName('latest') && (
        <button
          className='pk-m-cry-one'
          onClick={() => new Audio(urlOne).play()}
        >
          ♪
        </button>
      )}
      {getCryName('legacy') && (
        <button
          className='pk-m-cry-two'
          onClick={() => new Audio(urlTwo).play()}
        >
          ♫
        </button>
      )}
      <img
        className='pk-m-img'
        src={
          showFront
            ? pokemon?.sprites.other?.showdown?.front_default
            : pokemon?.sprites.other?.showdown?.back_default
        }
        alt=''
        onLoad={handleImageLoad}
        onClick={() => setShowFront((prev) => !prev)}
      />
      <p className='pk-m-type'>Type:</p>
      {getTypeName(0) && (
        <button className={`pk-m-type-one type-${typeOne}`}>
          {getTypeName(0)}
        </button>
      )}
      {getTypeName(1) && (
        <button className={`pk-m-type-two type-${typeTwo}`}>
          {getTypeName(1)}
        </button>
      )}
      <p className='pk-m-abilities'>Abilities:</p>
      {getAbilityName(0) && (
        <div className={`pk-m-ability-one`}>{getAbilityName(0)}</div>
      )}
      {getAbilityName(1) && (
        <div className={`pk-m-ability-two`}>{getAbilityName(1)}</div>
      )}
      <p className='pk-m-body-m'>Body-metrics:</p>
      <div className={'pk-m-base-exp'}>
        <span className='base-exp'>Base-exp:</span>
        {pokemon?.base_experience}
      </div>
      <div className={'pk-m-weight'}>
        <span className='Weight'>Weight:</span>
        {pokemon?.weight}
      </div>
      <div className={'pk-m-height'}>
        <span className='height'>Height:</span>
        {pokemon?.height}
      </div>
      <p className='pk-m-stats'>Stats:</p>
      <div className={'pk-m-hp'}>
        <span>HP:</span>
        {pokemon?.stats[0].base_stat}
      </div>
      <div className={'pk-m-attack'}>
        <span>Attack:</span>
        {pokemon?.stats[1].base_stat}
      </div>
      <div className={'pk-m-defense'}>
        <span>Defense:</span>
        {pokemon?.stats[2].base_stat}
      </div>
      <div className={'pk-m-special-attack'}>
        <span>S-attack:</span>
        {pokemon?.stats[3].base_stat}
      </div>
      <div className={'pk-m-special-defense'}>
        <span>S-defense:</span>
        {pokemon?.stats[4].base_stat}
      </div>
      <div className={'pk-m-speed'}>
        <span>Speed:</span>
        {pokemon?.stats[5].base_stat}
      </div>
      <button className='m-close' onClick={() => setIsOpen(false)}>
        ✗
      </button>
    </DialogPanel>
  </div>
</Dialog>; */
}
