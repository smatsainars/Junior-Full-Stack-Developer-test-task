import React, { useState } from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';
import { Product } from '../../types';

import './ProductGallery.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type ProductGalleryProps = {
  gallery: Product['gallery'];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ gallery }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider, setSlider] = useState<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: false, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: gallery.length > 1,
    beforeChange: (_, next) => setCurrentSlide(next),
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>
  };

  if (!gallery || gallery.length === 0) {
    return <div>No images available</div>;
  }

  const goToSlide = (index: number) => {
    if (slider) {
      slider.slickGoTo(index);
    }
  };

  return (
    <div className="product-gallery" data-testid="product-gallery">
      <div className="gallery-container">
        {/* Thumbnails Column */}
        <div className="thumbnails-column">
          {gallery.map((image, index) => (
            <div
              key={`thumb-${index}`}
              className={`thumbnail ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Main Slider */}
        <div className="main-slider">
          <Slider ref={setSlider} {...settings}>
            {gallery.map((image, index) => (
              <div key={`slide-${index}`}>
                <div className="main-image-container">
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>


    </div>
  );
};

export default ProductGallery;
