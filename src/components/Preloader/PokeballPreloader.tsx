import './PokeballPreloader.scss';

interface PreloaderProps {
  visible: boolean;
}

export const PokeballPreloader = ({ visible }: PreloaderProps) => {
  if (!visible) return null;

  return (
    <div className='preloader'>
      <div className='pokeball'></div>
    </div>
  );
};
