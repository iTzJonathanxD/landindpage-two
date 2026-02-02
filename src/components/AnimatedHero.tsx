import React from 'react';
import './AnimatedHero.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Check if mobile
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
      // Disable GSAP transforms on mobile
      gsap.set('.hero .img-top, .hero .img-bottom, .hero .img-left, .hero .img-right', {
        clearProps: "all"
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Prevent transform on mobile even if resized
          if (window.innerWidth <= 767) {
            gsap.set('.hero .images .img', { clearProps: "all" });
          }
        }
      }
    });

    tl.fromTo(".img-top", { y: -100 }, { y: -500 }, 0)
      .to(".img-bottom", { y: 500 }, 0)
      .to(".img-left", { x: -700 }, 0)
      .to(".img-right", { x: 500 }, 0)
      .fromTo(".word1", { x: 200 }, { x: 250 }, 0)
      .fromTo(".word2", { x: -300, y: 70 }, { x: -490 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="images">
        <img 
          src="image-top.webp" 
          className="img img-top" 
          alt="Top decoration"
        />
        <img 
          src="image-bottom.webp" 
          className="img img-bottom" 
          alt="Bottom decoration"
        />
        <img 
          src="image-left.webp" 
          className="img img-left" 
          alt="Left decoration"
        />
        <img 
          src="image-right.webp" 
          className="img img-right" 
          alt="Right decoration"
        />
      </div>
      <div className="text">
        <h1 className="word word1">Leopol</h1>
        <h1 className="word word2 text-gradient">Media</h1>
      </div>
    </section>
  );
};

export default AnimatedHero;
