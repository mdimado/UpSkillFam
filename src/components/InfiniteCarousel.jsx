import React from 'react';

const InfiniteCarousel = ({ items }) => {
  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((item, index) => (
          <div key={`${item.alt}-${index}`} className="carousel-item">
            <img 
              src={item.src} 
              alt={item.alt}
              className="transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item, index) => (
          <div key={`${item.alt}-duplicate-${index}`} className="carousel-item">
            <img 
              src={item.src} 
              alt={item.alt}
              className="transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;