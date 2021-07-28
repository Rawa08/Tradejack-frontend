import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
import './gallery.css';

export const Gallery = ({imageLinkArray}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="gallery">
        <button className="image-gallery-button"  onClick={() => setIsOpen(true)}>
        <img className="image-gallery" key={imageLinkArray[0]} src={imageLinkArray[0]} alt="look here, it's a naked crocodile" />
        </button>
        <ReactBnbGallery
          show={isOpen}
          photos={imageLinkArray}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
};