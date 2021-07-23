import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';

export const Gallery = ({imageLinkArray}) => {

    const [isOpen, setIsOpen] = useState(false);

        const image_style = {
        maxWidth: '100px',
        maxHight: '75px'
    }

    return (
      <>
        <button onClick={() => setIsOpen(true)}>
        <img style={image_style} key={imageLinkArray[0]} src={imageLinkArray[0]} alt="look here, it's a naked crocodile" />
        </button>
        <ReactBnbGallery
          show={isOpen}
          photos={imageLinkArray}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
};