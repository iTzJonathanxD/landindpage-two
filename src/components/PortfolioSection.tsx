import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PortfolioSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const images = [
    { src: 'images/img_3.jpg', className: 'img-3' },
    { src: 'images/img_1.jpg', className: 'img-1' },
    { src: 'images/img_4.jpg', className: 'img-4' },
    { src: 'images/img_2.jpg', className: 'img-2' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=600%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      '.img-1',
      { y: 500 },
      { y: -2100 },
      0
    )
    .fromTo(
      '.img-2',
      { y: 800 },
      { y: -2500 },
      0.2
    )
    .fromTo(
      '.img-3',
      { y: 100 },
      { y: -1500 },
      0.4
    )
    .fromTo(
      '.img-4',
      { y: 0 },
      { y: -2000 },
      0.6
    )
    .fromTo(
      '.portfolio-word1',
      { x: -500 },
      { x: -150 },
      0
    )
    .fromTo(
      '.portfolio-word2',
      { x: -100, y: 70 },
      { x: -300 },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Mobile carousel effect
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;
    
    const track = carouselRef.current;
    const items = Array.from(track.children);
    
    // Duplicate items for infinite effect
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    
    // Calculate total width and set animation
    const itemWidth = items[0].clientWidth + 20; // 20px for margin-right
    const totalItems = track.children.length;
    const totalWidth = itemWidth * totalItems;
    
    track.style.width = `${totalWidth}px`;
    
    // Set animation duration based on width
    const velocidad = 100; // lower = faster
    const duracion = totalWidth / velocidad;
    track.style.animationDuration = `${duracion}s`;
    
    return () => {
      // Cleanup if needed
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="portfolio-mobile">
        <div className="section-header">
          <h2 className="section-title">PORTAFOLIO</h2>
          <div className="comment">
            Nuestros trabajos seleccionados
          </div>
        </div>
        
        <div className="carrusel">
          <div className="carrusel-track" ref={carouselRef}>
            {images.map((img, index) => (
              <div className="card" key={index}>
                <div className="portfolio-image-container">
                  <img 
                    src={img.src} 
                    alt={`Portfolio ${index + 1}`}
                    className="portfolio-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="portfolio">
      <div className="portfolio-images">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Portfolio ${index + 1}`}
            className={`portfolio-img ${img.className}`}
          />
        ))}
      </div>
      <div className="portfolio-text">
        <h1 className="portfolio-word portfolio-word1">Trabajos</h1>
        <h1 className="portfolio-word portfolio-word2 portfolio-text-gradient">
          Seleccionados
        </h1>
      </div>
    </section>
  );
};

export default PortfolioSection;
