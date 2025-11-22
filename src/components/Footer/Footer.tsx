import './Footer.scss';

import groundImg from '../../assets/ground.png';
import rockBtn from '../../assets/rock-btn.png';
import github from '../../assets/github.svg';

interface loadMoreProps {
  loadMore: () => void;
}

export const Footer = ({ loadMore }: loadMoreProps) => {
  const count = Math.ceil(window.innerWidth / 192);

  return (
    <>
      <div className='footer'>
        {Array.from({ length: count }).map((_, i) => (
          <img key={i} className='groundImg' src={groundImg} alt='Ground' />
        ))}
        <div className='more-btn' onClick={loadMore}>
          <p>Dig down</p>
          <img src={rockBtn} alt='More pokemons' />
        </div>
        <div className='github'>
          <a href='https://github.com/dudychvo/'>
            <img src={github} alt='Github' />
          </a>
        </div>
        <p className='footerText'>Created with ❤️ by Volodymyr Dudych</p>
      </div>
    </>
  );
};
