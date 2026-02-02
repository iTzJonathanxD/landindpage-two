import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './AnimatedHeader.css';

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const smoothScrollTo = (targetPosition: number, duration: number = 1200) => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start: number | null = null;

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  };

  window.requestAnimationFrame(animation);
};

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  
  if (sectionId === 'home') {
    // Para el home, simplemente ir al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.history.pushState({}, '', '#');
    return;
  }
  
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80; // Ajusta según el tamaño de tu header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    smoothScrollTo(offsetPosition);
    
    // Actualizar la URL sin recargar la página
    window.history.pushState({}, '', `#${sectionId}`);
  }
};

const AnimatedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(100); // Altura inicial del header
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determinar si el scroll es hacia abajo o arriba
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo
        setIsScrolled(true);
        setIsVisible(false);
      } else {
        // Scroll hacia arriba
        setIsScrolled(false);
        setIsVisible(true);
      }
      
      // Actualizar la última posición de scroll
      setLastScrollY(currentScrollY);
      
      // Ajustar la altura basada en el scroll
      const newHeight = Math.max(50, 100 - (currentScrollY * 0.5));
      setHeaderHeight(Math.min(100, newHeight));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('.mobile-nav');
      const button = document.querySelector('.mobile-menu-button');
      
      if (isMobileMenuOpen && 
          menu && 
          !menu.contains(target) && 
          button && 
          !button.contains(target)) {
        toggleMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const headerStyle = {
    height: `${headerHeight}px`,
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 1s ease-in-out, height 1s ease-in-out',
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  function handleNavigation(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, arg1: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <header 
      id="home" 
      className={`navbar-content ${isScrolled ? 'scrolled' : ''}`}
      style={headerStyle}
    >
      <a href="/" className="brand" aria-current="page">
        <span className="brand-text">Leopol Media</span>
      </a>
      
      <nav className="desktop-nav">
        <ul className="menu">
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Inicio</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>Nosotros</a></li>
          <li><a href="#service-section" onClick={(e) => scrollToSection(e, 'service-section')}>Servicios</a></li>
          <li><a href="#portfolio-section" onClick={(e) => scrollToSection(e, 'portfolio-section')}>Portfolio</a></li>
        </ul>
      </nav>
     
      <div className="button-contact">
        <a href="#contact-section" onClick={(e) => scrollToSection(e, 'contact-section')}>Contacto</a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <nav 
          className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          
          
          <ul className="mobile-menu">
            <li><a href="#home" onClick={(e) => { scrollToSection(e, 'home'); toggleMobileMenu(); }}>Inicio</a></li>
            <li><a href="#about" onClick={(e) => { scrollToSection(e, 'about'); toggleMobileMenu(); }}>Nosotros</a></li>
            <li><a href="#service-section" onClick={(e) => { scrollToSection(e, 'service-section'); toggleMobileMenu(); }}>Servicios</a></li>
            <li><a href="#portfolio-section" onClick={(e) => { scrollToSection(e, 'portfolio-section'); toggleMobileMenu(); }}>Portfolio</a></li>
            <li className="mobile-contact-item">
              <a 
                href="#contact-section" 
                className="mobile-contact-button"
                onClick={(e) => { scrollToSection(e, 'contact-section'); toggleMobileMenu(); }}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AnimatedHeader;
