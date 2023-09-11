import React from 'react'
import { EyeSvg, PenSvg, TrashSvg } from '../../assets'
import './style.scss'

const Card = ({ isTransf }) => {
    return (
        <div className={`card cursor-pointer	 border border-grey rounded-md p-3 ${isTransf ? 'transform_y' : ''}`}>
            <img id='front' className='rounded-md' src='https://downloadfree3d.com/wp-content/uploads/2017/10/3D-Car-Sample.jpg' />

            <img id='back' className='rounded-md' src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' />

            <div className='mt-4'>
                <h5 className='text-black font-bold text-base'>₹ 200000</h5>
                <p className='text-black text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

                <h6 className='mt-2 text-xs font-bold text-green'>IN STOCK</h6>
                {
                    //red for out of stock
                }
            </div>

            <div className='actions mt-3 flex flex-row items-center gap-1'>
                <button>
                    <EyeSvg width={'20px'} height={'18px'} />
                </button>
                <button>
                    <PenSvg width={'18px'} height={'18px'} />
                </button>
                <button>
                    <TrashSvg width={'18px'} height={'18px'} />
                </button>
            </div>
        </div>
    )
}

export default Card