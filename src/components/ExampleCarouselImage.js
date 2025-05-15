import React from 'react';

function ExampleCarouselImage({ src, text }) {
  return (
    <div style={{ height: '700px', position: 'relative' }}>
      <img
        src={src}
        alt={text}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

export default ExampleCarouselImage;
