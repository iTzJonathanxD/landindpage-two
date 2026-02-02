import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #1C1C1C;
  padding: 40px 0;
`;

const CarouselTrack = styled.div`
  display: flex;
  width: 200%;
  animation: ${scroll} 40s linear infinite;
`;

const CarouselItem = styled.a`
  flex: 0 0 auto;
  width: 20vw;
  height: 80px;
  margin: 0 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
    filter: grayscale(100%) brightness(0.8);
    transition: filter 0.3s ease;
    
    &:hover {
      filter: grayscale(0) brightness(1);
    }
  }

  @media (max-width: 600px) {
    width: 40vw;
    margin: 0 5vw;
  }
`;

const InfiniteCarousel: React.FC = () => {
  const logos = [
    { name: 'NXT Level', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/64624d6be5365dd4cfb840f3_Imagotipo%20(1).png', url: 'tel:7877180200' },
    { name: 'Master Car Rental', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/635ec66860eb5a504ba22629_output-onlinepngtools.png', url: 'https://www.mastercarrentalpr.com' },
    { name: 'Maldo DC', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/6216496be6477ca55e763218_Horizontal%20(3).png', url: 'https://www.instagram.com/maldodc_/' },
    { name: 'Mahia', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/64624ab7dcae84bb56f63672_Logo%20Horizontal%20(2).png', url: 'tel:9398814858' },
    { name: 'APC Towing', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/635ec7ea799bcefbf9146651_output-onlinepngtools%20(2).png', url: 'https://www.facebook.com/apctowingytransport' },
    { name: 'Nicoleta', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/62164975617b16be2c8917bb_Nicoleta.png', url: 'https://www.facebook.com/profile.php?id=100063686461422' },
    { name: 'Smopers', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/62164972d6b9bce99096e778_Logo%20Vertical.png', url: 'https://www.facebook.com/smopers' },
    { name: 'Quality Care', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/635eca4a70620b27edd8d2a0_output-onlinepngtools%20(4)%20(1).png', url: 'https://www.facebook.com/profile.php?id=100045540476633' },
    { name: 'OR Accessories PR', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/635eca5cb165560db6f16084_output-onlinepngtools%20(3).png', url: 'https://www.facebook.com/ORAccesoriesPR' },
    { name: 'Master Motors PR', logo: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/62164973ccbcd2adc4a695db_Logo.png', url: 'https://mastermotorspr.com/' }
  ];

  return (
    <CarouselContainer id="service-section">
      <CarouselTrack>
        {[...logos, ...logos].map((item, index) => (
          <CarouselItem 
            key={`${item.name}-${index}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            <img 
              src={item.logo} 
              alt={item.name}
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselTrack>
    </CarouselContainer>
  );
};

export default InfiniteCarousel;
