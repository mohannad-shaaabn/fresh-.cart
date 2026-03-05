import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      
      {/* Main Slider */}
      <div className="w-full md:w-9/12">
        <Slider {...settings}>
          <div>
            <img
              src={img1}
              className="w-full h-56 md:h-96 object-cover"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src={img2}
              className="w-full h-56 md:h-96 object-cover"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src={img3}
              className="w-full h-56 md:h-96 object-cover"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>

      {/* Side Images - Desktop Only */}
      <div className="hidden md:block md:w-3/12 space-y-3">
        <img src={img3} className="w-full h-48 object-cover" alt="" />
        <img src={img1} className="w-full h-48 object-cover" alt="" />
      </div>

    </div>
  );
}