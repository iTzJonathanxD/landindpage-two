import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  useEffect(() => {
    gsap.utils.toArray(".gatillador").forEach((el: any) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => el.classList.add("translate-Y"),
        markers: false
      });
    });
  }, []);

  return (
    <section id="contact-section" className="contact-section">
      <h2 id="contact" className="section-title">CONTÁCTANOS</h2>
      <div className="contact-container">
        <div className="contact text-container">
          <div className="line-container gatillador">
            <span className="principal">
              ¿Tienes un proyecto?<br />¡Hablemos!
            </span>
          </div>

          <div className="line-container gatillador">
            <span className="principal-1">
              Cuéntame sobre tu proyecto
            </span>
          </div>

          <div className="image-text-container">
            <div className="contact-description">
              <input 
                type="text" 
                className="gatillador" 
                placeholder="Nombre completo"
              />
              <input 
                type="email" 
                className="gatillador" 
                name="email" 
                id="email" 
                placeholder="Correo electrónico*"
              />
              <input 
                type="tel" 
                className="gatillador" 
                name="tel" 
                id="tel" 
                placeholder="Teléfono"
              />
              <input 
                type="text" 
                className="gatillador" 
                name="mensaje" 
                id="mensaje" 
                placeholder="Tu mensaje"
              />
              <div className="summit-btn-container gatillador">
                <button className="summit-btn">Enviar mensaje</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
