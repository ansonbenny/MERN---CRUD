import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'

const Item = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className='product_item'> {
            //grid grid-cols-2 gap-6 
        }
            <div className='left'>
                <Slider {...settings}>
                    <img className='rounded' src='https://downloadfree3d.com/wp-content/uploads/2017/10/3D-Car-Sample.jpg' />
                    <img className='rounded' src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' />
                </Slider>
            </div>
            <div className='right'>
                <h1 className='title text-xl font-bold text-grey_black capitalize'>
                    In publishing and graphic design, Lorem ipsum is a placeholder text co.
                </h1>

                <div className="flex flex-row gap-2 mt-3 mb-5 items-center">
                    <h1 className='price text-2xl text-grey_black font-bold'>
                        ₹200000
                    </h1>

                    <h6 className='uppercase text-green text-sm font-bold'>IN Stock</h6>
                    {
                        //red for out of stock
                    }
                </div>

                <h6 className='text-sm mb-1'>
                    <span className='uppercase text-grey_black font-bold'>manufacturer: </span>
                    <span className='capitalize text-black'>audi</span>
                </h6>

                <h6 className='text-sm mb-1'>
                    <span className='uppercase text-grey_black font-bold'>model: </span>
                    <span className='capitalize text-black'>audi a4</span>
                </h6>

                <h6 className='text-sm mt-3'>
                    <span className='uppercase text-grey_black font-bold'>QTY: </span>
                    <span className='capitalize text-black'>2</span>
                </h6>

                <div className='text-sm text-black mt-4 mb-3'>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>

                {
                    //if e-commerce
                    false &&
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
                }
            </div>
        </div>
    )
}

export default Item