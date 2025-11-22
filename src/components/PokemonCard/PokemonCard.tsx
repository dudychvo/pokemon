import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import type { PokemonInfo, PokemonInfoURL } from '../../types/PokemonInfo';

import cardBg from '../../assets/card-bg.png';

import './PokemonCard.scss';

export const PokemonCard = ({ url }: PokemonInfoURL) => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
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

  const getTypeName = (typeIndex: number) => {
    return pokemon?.types?.[typeIndex]?.type.name.replace(/^./, (c) =>
      c.toUpperCase()
    );
  };
  const typeOne = getTypeName(0)?.toLowerCase();
  const typeTwo = getTypeName(1)?.toLowerCase();

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const w = e.currentTarget.naturalWidth;
    e.currentTarget.classList.add(w > 87 ? 'pk-img-wide' : 'pk-img-narrow');
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='pk-container'>
        <img src={cardBg} alt='Pokemon card' className='pk-bg' />
        <div className='pokemon'>
          <h2 className='pk-num'>{'#' + pokemon?.id}</h2>
          {getTypeName(0) && (
            <button className={`pk-type-one type-${typeOne}`}>
              {getTypeName(0)}
            </button>
          )}
          {getTypeName(1) && (
            <button className={`pk-type-two type-${typeTwo}`}>
              {getTypeName(1)}
            </button>
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
            {/* Overlay */}
            <div className='overlay' aria-hidden='true' />

            {/* Centering wrapper */}
            <div className='modal-wrapper'>
              <DialogPanel className='modal-panel'>
                <DialogTitle>Deactivate account</DialogTitle>
                <Description>
                  This will permanently deactivate your account
                </Description>

                <p>Are you sure you want to deactivate your account?</p>

                <div className='buttons'>
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                  <button onClick={() => setIsOpen(false)}>Deactivate</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
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
