import './Footer.scss';

import groundImg from '../../assets/ground.png';
import rockBtn from '../../assets/rock-btn.png';
import github from '../../assets/github.svg';

interface loadMoreProps {
  loadMore: () => void;
}

export const Footer = ({ loadMore }: loadMoreProps) => {
  const imageWidth = 192;
  const containerWidth = window.innerWidth;
  const fullImages = Math.floor(containerWidth / imageWidth);
  const leftover = containerWidth - fullImages * imageWidth;
  const calcLeftover = leftover / fullImages;

  return (
    <>
      <div
        className='footer'
        style={{ '--calcLeftover': calcLeftover + 'px' } as React.CSSProperties}
      >
        <div className='footer-bg'>
          {Array.from({ length: fullImages }).map((_, i) => (
            <img
              key={i}
              className='groundImg'
              src={groundImg}
              alt=''
              aria-hidden='true'
              loading='lazy'
            />
          ))}
        </div>
        <div className='more-btn' onClick={loadMore}>
          <p>Dig down</p>
          <img src={rockBtn} alt='' aria-hidden='true' loading='lazy' />
        </div>
        <div className='github'>
          <a href='https://github.com/dudychvo/'>
            <img src={github} alt='Github' loading='lazy' />
          </a>
        </div>
        <p className='footerText'>Created with ❤️ by Volodymyr Dudych</p>
      </div>
    </>
  );
};
