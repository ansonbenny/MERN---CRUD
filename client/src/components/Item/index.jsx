import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'

const Item = ({ data }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className='product_item'>
            <div className='left'>
                <Slider {...settings}>
                    {
                        <img className='rounded' src={`/${data?.thumbnail?.path}`} />
                    }
                    {
                        data?.files?.map((obj, key) => {
                            return <img key={key} className='rounded' src={`/${obj?.path}`} />
                        })
                    }
                </Slider>
            </div>
            <div className='right'>
                <h1 className='title text-xl font-bold text-grey_black capitalize'>
                    {data?.name}
                </h1>

                <div className="flex flex-row gap-2 mt-3 mb-5 items-center">
                    <h1 className='price text-2xl text-grey_black font-bold'>
                        ₹{data?.price}
                    </h1>

                    <h6 className={`uppercase text-sm font-bold ${data?.available ? "text-green" : "text-red"}`}>
                        {
                            data?.available == "in_stock" ? "Available"
                                : "not available"
                        }
                    </h6>
                </div>

                <h6 className='text-sm mb-1'>
                    <span className='uppercase text-grey_black font-bold'>manufacturer: </span>
                    <span className='capitalize text-black'>{data?.manufacture}</span>
                </h6>

                <h6 className='text-sm mb-1'>
                    <span className='uppercase text-grey_black font-bold'>model: </span>
                    <span className='capitalize text-black'>{data?.model}</span>
                </h6>

                <h6 className='text-sm mt-3'>
                    <span className='uppercase text-grey_black font-bold'>QTY: </span>
                    <span className='capitalize text-black'>{data?.qty}</span>
                </h6>

                <div className='text-sm text-black mt-4 mb-3'>
                    <p>
                        {data?.description}
                    </p>
                </div>

                {
                    //if e-commerce
                    /*
                    <div className='grid grid-cols-2 gap-1 items-center mt-3'>
                        <div className='flex flex-row items-center border border-grey rounded'>
                            <button className='h-11 pl-3 pr-3'>+</button>
                            <input type="number" className='bg-none text-center h-11 outline-none text-black w-full' />
                            <button className='h-11 pl-3 pr-3'>-</button>
                        </div>
                        <button className='border-2 border-red text-red h-11 p-8 pt-2 pb-2 rounded font-bold uppercase duration-500 transition ease-in-out hover:bg-red hover:text-white'>
                            Buy
                        </button>
                    </div>
                    */
                }
            </div>
        </div>
    )
}

export default Item