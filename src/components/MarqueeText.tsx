import React, { useEffect, useRef } from 'react';
import './MarqueeText.css';

interface MarqueeTextProps {
  items: {
    text: string;
    icon?: string;
  }[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  items,
  speed = 20,
  direction = 'left',
  className = '',
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    // Duplicate items for seamless looping
    const marquee = marqueeRef.current;
    const content = contentRef.current;
    const contentWidth = content.scrollWidth;
    
    // We need to duplicate the content to create a seamless loop
    content.innerHTML = content.innerHTML + content.innerHTML;

    let animationFrameId: number;
    let position = 0;
    const speedValue = direction === 'left' ? -1 : 1;

    const animate = () => {
      position += speedValue;
      
      // Reset position when scrolled one content width
      if (Math.abs(position) >= contentWidth) {
        position = 0;
      }
      
      content.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [items, direction, speed]);

  return (
    <div className={`marquee-wrap ${className}`} ref={marqueeRef}>
      <div className="marquee-content-block" ref={contentRef}>
        <div className="marquee-block">
          {items.map((item, index) => (
            <div className="marquee-item" key={index}>
              <div className="marquee-text">{item.text}</div>
              {item.icon && (
                <img 
                  src={item.icon} 
                  loading="lazy" 
                  alt="" 
                  className="marquee-icon" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;
