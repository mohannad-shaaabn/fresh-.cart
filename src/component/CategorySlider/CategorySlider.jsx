import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useApi from '../useApi/useApi';

export default function CategorySlider() {
    const { data } = useApi('categories');
    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        speed: 500,
        arrows: false,
        dots: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };


    return (
        <div className="my-5">
            <Slider {...settings}>
                {data?.data?.data?.map((category) => (
                    <div key={category._id} className="px-2">
                        <article className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
                            <img src={category.image} alt={category.name} className='w-full aspect-[4/3] object-cover object-top' />
                            <h5 className='px-3 py-2 text-center text-sm font-medium text-slate-700'>{category.name}</h5>
                        </article>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
