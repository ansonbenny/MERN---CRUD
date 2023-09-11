import React from 'react'
import { ExitSvg } from '../../assets'
import './style.scss'

const Header = () => {
  return (
    <header className='flex flex-row gap-3 border-b border-grey p-3 pb-2 mb-5 items-center justify-items-center'>
      
      <div className="flex flex-row gap-1 w-full_moble">
        <h1 className='text-black font-bold text-2xl'>Kale</h1>

        <div className="mobile">
          <button className='ml-auto border border-blue bg-blue p-2 h-8 flex items-center text-white rounded'>+ Add Vehicle</button>

          <button className='bg-none '>
            <ExitSvg width={'22px'} height={'22px'} color={"#fb7185"} />
          </button>
        </div>
      </div>

      <input type="text" placeholder='Search' className='w-auto rounded text-black border border-grey outline-none p-2 h-8' />

      <div className="flex flex-row desktop gap-1 ml-auto">
        <button className='border border-blue bg-blue p-2 h-8 flex items-center text-white rounded'>+ Add Vehicle</button>

        <button className='bg-none '>
          <ExitSvg width={'22px'} height={'22px'} color={"#fb7185"} />
        </button>
      </div>
    </header>
  )
}

export default Header