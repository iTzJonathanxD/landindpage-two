import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  // Animación de líneas
  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((text, index) => {
        if (!text) return;
        
        // Mostrar el texto pero con ancho 0 inicialmente
        text.classList.add('visible');
        
        // Configuración inicial - texto oculto
        gsap.set(text, { width: '0%' });
        
        // Animación de revelación
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: `top+=${(index + 1) * 100}px 20%`,
            scrub: 1,
            markers: false,
            id: `line-${index}`,
            toggleActions: 'play none none none'
          },
          onStart: () => {
            text.classList.add('visible');
          },
          onReverseComplete: () => {
            text.classList.remove('visible');
          }
        });
        
        // Animación del ancho del texto
        tl.to(text, {
          width: '100%',
          duration: 1,
          ease: 'power2.out',
          delay: index * 0.1
        });

        const st = ScrollTrigger.getById(`line-${index}`);
        if (st) scrollTriggers.current.push(st);
      });

      // Add animation for image cover
      const imageContainer = document.querySelector('.about-image-container');
      if (imageContainer) {
        gsap.to('.tapa-imagen', {
          y: '100%',
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top 40%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      }

      // Add animation for description cover
      const descriptionContainer = document.querySelector('.about-description');
      if (descriptionContainer) {
        gsap.to('.tapa-descripcion', {
          y: '100%',
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descriptionContainer,
            start: 'top 40%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggers.current.forEach(trigger => trigger.kill());
      scrollTriggers.current = [];
    };
  }, []);

  // Limpieza de ScrollTriggers
  useEffect(() => {
    return () => {
      scrollTriggers.current.forEach(st => st.kill());
      scrollTriggers.current = [];
    };
  }, []);

  const lines = [
    { text: 'Ayudamos a empresas y', class: 'principal' },
    { text: 'emprendedores a mejorar', class: 'principal' },
    { text: 'su presencia digital.', class: 'principal' },
    { text: 'Somos especialistas en Diseño & Marketing,', class: 'secondary' },
    { text: 'nos encargamos de diseñar tu Branding, plan de', class: 'secondary' },
    { text: 'contenido, social media y más.', class: 'secondary' },
    { text: '#QueremosPresumirte', class: 'secondary' }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="about-section"
    >
      <h2 className="section-title">NOSOTROS</h2>
      <div className="about-container">
        <div className="about-text-block">
          {lines.map((line, index) => (
            <div key={index} className="about-item">
              <div 
                ref={el => lineRefs.current[index] = el} 
                className="about-text"
              >
                <span className={line.class}>{line.text}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="image-text-container">
          <div className="about-image-container">
            <div className="tapa-imagen" />
            <div className="about-image" />
          </div>
          
          <div className="about-description">
            <div className="tapa-descripcion " />
            <p>
              <strong>Hola, somos Leopol Media</strong>
            </p>
            <p>
              Somos una agencia de mercadeo digital con sede en Puerto Rico, especializada en mercadeo digital, branding y diseño social. Nos enfocamos en el crecimiento de tu negocio por medio de estrategias, Google, tráfico y redes sociales.
            </p>
            <p>
              Estamos certificados por Google Partners (Socios de Google). Nos dedicamos a posicionar su negocio en los principales motores de búsqueda y redes sociales. Nos concentramos en el crecimiento de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
