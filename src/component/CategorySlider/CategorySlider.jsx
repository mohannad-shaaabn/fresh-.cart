import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useApi from '../useApi/useApi';

export default function CategorySlider() {

  let { data } = useApi('categories');

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="w-full my-6 px-3">
      <Slider {...settings}>
        {data?.data?.data?.map((category) => (
          <div key={category._id} className="px-2 text-center">
            <img
              src={category.image}
              alt={category.name}
              className="h-32 md:h-40 w-full object-contain"
            />
            <h5 className="mt-2 text-sm md:text-base truncate">
              {category.name}
            </h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}