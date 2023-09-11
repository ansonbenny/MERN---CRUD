import React from 'react'
import './style.scss'

const Header = () => {
  return (
    <header className='flex flex-row gap-3 border-b border-grey p-3 pb-2 mb-5 items-center justify-items-center'>
      <h1 className='text-black font-bold text-2xl'>Kale</h1>

      <input type="text" placeholder='Search' className='w-auto rounded ml-auto text-black border border-grey outline-none p-2 h-8' />
    </header>
  )
}

export default Header