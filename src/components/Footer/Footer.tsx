import './Footer.scss';

import groundImg from '../../assets/ground.png';

export const Footer = () => {
  const count = Math.ceil(window.innerWidth / 192);

  console.log(count);

  return (
    <>
      <div className='footer'>
        {Array.from({ length: 7 }).map((_, i) => (
          <img key={i} className='groundImg' src={groundImg} alt='Ground' />
        ))}
      </div>
    </>
  );
};
