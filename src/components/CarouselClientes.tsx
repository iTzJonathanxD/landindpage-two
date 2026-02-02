import { useEffect, useRef } from 'react';
import './CarouselClientes.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Elvis Ortiz',
    role: 'Master Motors',
    text: 'Gracias a Leopol Media logramos posicionarnos en Ponce como el Concesionario de autos usados #1 en ventas. Estamos contentos y ampliando nuestro crecimiento.',
    image: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/6214e9a9d87620056cd70e5e_89815e22-206b-4340-b809-9b917dd200fc.jpg'
  },
  {
    id: 2,
    name: 'Bertito Menendez',
    role: 'Bertito\'s Jumping',
    text: 'Son los mejores, llevo un año utilizando sus servicios de diseño gráfico y manejo de redes sociales y han llevado mi compañía al próximo nivel. Desde que confío en Leopol Media mis reservaciones han aumentado.',
    image: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/6214ea7bd4b5d9cde5f2ddd0_IMG_0336.jpg'
  },
  {
    id: 3,
    name: 'Irwin Maldonado',
    role: 'Maldo DC',
    text: 'Quedé encantado con el Branding que trabajo Leopol Media para mi marca Maldo DC. Responsables y atentos en todo momento.',
    image: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/6214ebd031c3941a06a237b4_IMG_0340.jpg'
  },
  {
    id: 4,
    name: 'Hiram Muñoz',
    role: 'Next Level Repair',
    text: 'Gracias al equipo de Leopol Media pude rediseñar mi marca Next Level Repair, quede encantado con el resultado final.',
    image: 'https://cdn.prod.website-files.com/61ccc51aa0d65d2c7575a512/64624cbe28d87d6fae97fc4d_hiram.png'
  }
];

const CarouselClientes = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
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
  }, []);

  return (
    <section className="testimonial-section">
      <div className="section-header">
        <h2 className="section-title">TESTIMONIOS</h2>
        <div className="comment">
          Preferimos que sean nuestros clientes quienes te compartan su experiencia
        </div>
      </div>

      <div className="carrusel">
        <div className="carrusel-track" ref={trackRef}>
          {testimonials.map((testimonial) => (
            <div className="card" key={testimonial.id}>
              <div className="testimonial-card-top">
                <div className="testimonial-quote-icon-block">
                  <img 
                    className="testimonial-quote-icon" 
                    src="https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/68213673d973842c02e134e1_Quote%20Icon.svg" 
                    loading="lazy" 
                    alt="Quote Icon" 
                  />
                </div>
                <div className="testimonial-client-image-block">
                  <img 
                    className="testimonial-client-image" 
                    src={testimonial.image} 
                    alt={`${testimonial.name}'s profile`} 
                  />
                  
                </div>
              </div>
                <div className="name-container">
                  <div className="name">{testimonial.name}</div>
                  <div className="role">{testimonial.role}</div>
                </div>
              <div className="testimonial-text-block">
                <div className="testimonial-text">
                  {testimonial.text}
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselClientes;
