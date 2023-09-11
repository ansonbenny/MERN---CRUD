import React from 'react'
import { EyeSvg, PenSvg, TrashSvg } from '../../assets'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Card = ({ isTransf, data, onTrash }) => {
    const navigate = useNavigate();

    return (
        <div onClick={(e) => {
            if (!e?.target?.classList?.contains("prevent")) {
                navigate(`/p/${data?._id}`)
            }
        }} className={`card cursor-pointer	 border border-grey rounded-md p-3 ${isTransf ? 'transform_y' : ''}`}>
            <img id='front' className='rounded-md' src={`/${data?.thumbnail?.path}`} />

            <img id='back' className='rounded-md'
                src={`/${data?.files?.length >= 1 ? data?.files?.[0]?.path : data?.thumbnail?.path}`} />

            <div className='mt-4'>
                <h5 className='text-black font-bold text-base'>₹{data?.price}</h5>
                <p className='text-black text-sm'>{data?.name}</p>

                <h6 className={`mt-2 text-xs font-bold ${data?.available == "in_stock" ? "text-green" : "text-red"}`}>
                    {
                        data?.available == "in_stock" ?
                            "Available" : "Not Available"
                    }
                </h6>
            </div>

            <div className='actions mt-3 flex flex-row items-center gap-1'>
                <button onClick={() => {
                    navigate(`/p/${data?._id}`)
                }}>
                    <EyeSvg width={'20px'} height={'18px'} />
                </button>
                <button className='prevent' onClick={() => {
                    navigate(`/edit/${data?._id}`)
                }}>
                    <PenSvg width={'18px'} height={'18px'} />
                </button>
                <button onClick={() => {
                    onTrash(data?._id)
                }} className='prevent'>
                    <TrashSvg width={'18px'} height={'18px'} />
                </button>
            </div>
        </div>
    )
}

export default Card