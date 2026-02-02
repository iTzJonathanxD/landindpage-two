import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  tag?: string;
}

const ServicesSection = () => {
  // Inicializar con el primer servicio activo
  const [activeService, setActiveService] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Referencias
  const sectionRef = useRef<HTMLElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const imageBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mover el array de servicios fuera del render para evitar recreación
  const services = useMemo<ServiceItem[]>(
    () => [
      {
        id: 1,
        title: 'Estrategia de contenido',
        description: 'Generamos contenidos de calidad que muestren el valor agregado de tu marca en todos los formatos para que tengas presencia en los diferentes canales digitales, tales como redes sociales, "Billboards" & medios impresos.',
        tag: '01',
        image: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/682040945ff6553d135c9c71_Service%20Image%202.webp',
      },
      {
        id: 2,
        title: 'Branding & Logo',
        description: 'Creamos marcas extraordinarias desarrollamos y cuidamos la propuesta de valor. Nuestra promesa una marca memorable, atemporal y única.',
        tag: '02',
        image: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/68204094b945782e0d5af50d_Service%20Image%201.webp',
      },
      {
        id: 3,
        title: 'Social Media & Ads',
        description: 'Nuestros servicios de gestión de medios sociales son perfectos para hacer crecer la comunidad social de su marca y comprometerse con el público adecuado. Gestionamos todo, desde la creación del contenido hasta la gestión de los comentarios y todo lo demás.',
        tag: '03',
        image: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/68204094dc77529d8bc2df3a_Sevice%20Image%203.webp',
      },
      {
        id: 4,
        title: 'Ux & Diseño Web',
        description: 'Desarrollamos la página web de tu marca bajo los lineamientos apropiados de diseño y usabilidad que los usuarios buscan al navegar en la web.',
        tag: '04',
        image: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/68204094d42d54a9b7af5112_Sevice%20Image%204.webp',
      },
    ],
    []
  );

  // Precargar imágenes al montar el componente
  useEffect(() => {
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
    });
  }, [services]);

  // Efecto para detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejador de hover simplificado
  const handleServiceHover = useCallback((id: number) => {
    // Si ya está activo, no hacer nada
    if (id === activeService) return;
    
    setActiveService(id);
  }, [activeService]);

  // Efecto para manejar el scroll en móvil
  useEffect(() => {
    if (isMobile && activeService !== null) {
      const element = document.getElementById(`service-${activeService.toString()}`);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          // Ajuste adicional para no quedar pegado al borde superior
          window.scrollBy(0, -20);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [activeService, isMobile]);

  // Unificar las animaciones en un solo useEffect
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada de la sección
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Animación de los ítems de servicio
      serviceItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Efecto para manejar las animaciones de las imágenes
  useEffect(() => {
    if (!imagesContainerRef.current) return;

    const images = imagesContainerRef.current.querySelectorAll('.service-image');
    
    images.forEach((img, index) => {
      const isActive = index + 1 === activeService;
      gsap.to(img, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }, [activeService]);

  // Renderizar la lista de servicios
  const renderServiceList = useMemo(() => {
    return services.map((service, index) => {
      const isActive = service.id === activeService;
      
      return (
        <div 
          id={`service-${service.id.toString()}`}
          key={service.id}
          ref={el => serviceItemsRef.current[index] = el}
          className={`service-item ${isActive ? 'active' : ''}`}
          onMouseEnter={!isMobile ? () => handleServiceHover(service.id) : undefined}
          onClick={() => handleServiceHover(service.id)}
        >
          <div className="service-list-content">
            <div className="service-list-flex">
              <h3 className="service-list-tag-text">{service.tag}</h3>
              <h2 className="header-large">{service.title}</h2>
              
              {/* Contenido móvil que se expande */}
              {isMobile && isActive && (
                <div className="mobile-service-content">
                  <div className="service-image-block">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="service-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className="service-description">
                    <p>{service.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  }, [services, activeService, isMobile]);

  return (
    <section id="services" ref={sectionRef} className="services-section">
      <div className="service-header-block">
        <div className="section-tag-block">
          <div className="tag-text">Nuestros servicios</div>
        </div>
        <div className="header-block">
          <h2 className="section-header">El poder de la innovación</h2>
        </div>
      </div>
      <div className="main-container">
        {/* Contenedor de imágenes solo visible en desktop */}
        {!isMobile && (
          <div ref={imagesContainerRef} className="service-images-container">
            {services.map((service, index) => (
              <div 
                key={`img-${service.id}`}
                className={`service-image-container ${service.id === activeService ? 'active' : ''}`}
              >
                <div 
                  ref={el => imageBlocksRef.current[index] = el}
                  className="service-image-block"
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="service-image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="service-description">
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="service-content-block">
          <div className="offered-services">
            {renderServiceList}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
