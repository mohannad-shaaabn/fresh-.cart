import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useApi from '../useApi/useApi';

export default function CategorySlider() {
 let{data}=useApi('categories')


    return (
        <div className="container mx-auto  my-3">
            <Slider slidesToShow={6} infinite slidesToScroll={3} autoplay speed={500} arrows>
                {data?.data?.data?.map((category) => (
                    <div key={category._id} className="text-center">
                        <img src={category.image} alt={category.name} className='h-64 object-cover w-full object-top'  />
                        <h5 className='mt-2' >{category.name}</h5>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
