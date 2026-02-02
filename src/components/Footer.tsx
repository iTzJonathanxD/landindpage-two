import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top">
           <a href="#home">
            <img src="https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/681f7868c518eee5abc681b0_Arrow.svg" loading="lazy" alt="Arrow Icon" style={{ color: 'gray' }} />
           </a>
          </button>

          {/* Social media links */}
          <div className="social-section">
            <p className="social-title">Social media</p>
            <div className="social-links">
              <div className="button-social">
                <a className="facebook-class social-link" href="https://www.facebook.com">
                  <svg width="14" height="24" viewBox="0 0 11 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.76125 11.1075L10.2795 7.69491H7.03751V5.48032C7.03751 4.54669 7.49036 3.63665 8.94248 3.63665H10.4165V0.731316C10.4165 0.731316 9.07876 0.500732 7.79984 0.500732C5.1297 0.500732 3.38454 2.1351 3.38454 5.09394V7.69491H0.416504V11.1075H3.38454V19.3573C3.97968 19.4516 4.58965 19.5007 5.21102 19.5007C5.83239 19.5007 6.44237 19.4516 7.03751 19.3573V11.1075H9.76125Z" />
                  </svg>
                </a>
              </div>
              
              <div className="button-social">    
                <a className="social-link" href="https://www.instagram.com">
                  <svg width="30" height="30" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.6665 12.5007C2.6665 8.02239 2.6665 5.78322 4.05774 4.39197C5.44899 3.00073 7.68816 3.00073 12.1665 3.00073C16.6448 3.00073 18.884 3.00073 20.2753 4.39197C21.6665 5.78322 21.6665 8.02239 21.6665 12.5007C21.6665 16.979 21.6665 19.2182 20.2753 20.6095C18.884 22.0007 16.6448 22.0007 12.1665 22.0007C7.68816 22.0007 5.44899 22.0007 4.05774 20.6095C2.6665 19.2182 2.6665 16.979 2.6665 12.5007Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M16.6665 12.5007C16.6665 14.986 14.6518 17.0007 12.1665 17.0007C9.68122 17.0007 7.6665 14.986 7.6665 12.5007C7.6665 10.0155 9.68122 8.00073 12.1665 8.00073C14.6518 8.00073 16.6665 10.0155 16.6665 12.5007Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M17.6735 7.00073H17.6646" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              
              <div className="button-social">
                <a 
                  className="wsp-class social-link" 
                  target="_blank" 
                  href="https://api.whatsapp.com/send?phone=%2B17874328057" 
                  id="whatsapp-button"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Large Gradient Text */}
          <div className="name-image-container">
            <img 
              className="name-image" 
              src="leopolmedia.png" 
              alt="Leopol Media" 
            />
            <div className="gradient-overlay"></div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p className="copyright-text"> 2024 Leopol Media. All rights reserved.</p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
