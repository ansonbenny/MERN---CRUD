import React, { useEffect } from 'react'
import { Card, Item } from '../components'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Product = () => {
    useEffect(() => {
        document.title = "Kale - Product"
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <section data-page="product" className='p-3'>
            <Item />

            {/* <div className="mt-10" id='similar'>
                <h1 className='text-lg text-black capitalize underline'>Similar</h1>

                <Slider {...settings}>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((obj, key) => {
                        return <Card key={key} />
                    })}
                </Slider>
            </div> */}
        </section>
    )
}

export default Product