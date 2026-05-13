import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        infinite: true,
    };


    return (
        <section className="animate-fade-up grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="lg:col-span-9 overflow-hidden rounded-2xl hover-float">
                <Slider {...settings}>
                    <div>
                        <img src={img1} className="w-full aspect-[16/9] max-h-[520px] object-cover object-center" alt="Slide 1" />
                    </div>
                    <div>
                        <img src={img2} className="w-full aspect-[16/9] max-h-[520px] object-cover object-center" alt="Slide 2" />
                    </div>
                    <div>
                        <img src={img3} className="w-full aspect-[16/9] max-h-[520px] object-cover object-center" alt="Slide 3" />
                    </div>
                </Slider>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="overflow-hidden rounded-2xl hover-float">
                    <img src={img3} className="w-full h-full min-h-40 sm:min-h-44 lg:min-h-52 object-cover object-center" alt="Promo 1" />
                </div>
                <div className="overflow-hidden rounded-2xl hover-float">
                    <img src={img1} className="w-full h-full min-h-40 sm:min-h-44 lg:min-h-52 object-cover object-center" alt="Promo 2" />
                </div>
            </div>
        </section>
    );
}
