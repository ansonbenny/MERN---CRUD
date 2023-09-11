import React from 'react'
import { ExitSvg } from '../../assets'
import { useNavigate } from 'react-router-dom'
import { axios } from '../../lib'
import './style.scss'

const Header = () => {
  const navigate = useNavigate()

  const LogOut = async () => {
    try {
      let res = await axios.get('/user/logout')

      if (res?.['data']) {
        navigate('/')
      }
    } catch (err) {
      alert("Something went wrong")
    }
  }

  return (
    <header className='flex flex-row gap-3 border-b border-grey p-3 pb-2 mb-5 items-center justify-items-center'>

      <div className="flex flex-row gap-1 w-full_moble">
        <h1 className='text-black font-bold text-2xl cursor-pointer' onClick={() => navigate('/')}>Kale</h1>

        <div className="mobile">
          <button onClick={() => {
            navigate('/add')
          }} className='ml-auto border border-blue bg-blue p-2 h-8 flex items-center text-white rounded'>+ Add Vehicle</button>

          <button className='bg-none' onClick={LogOut}>
            <ExitSvg width={'22px'} height={'22px'} color={"#fb7185"} />
          </button>
        </div>
      </div>

      <input onInput={(e) => {
        navigate(`?search=${e?.target?.value}`)
      }} type="text" placeholder='Search' className='w-auto rounded text-black border border-grey outline-none p-2 h-8' />

      <div className="flex flex-row desktop gap-1 ml-auto">
        <button onClick={() => {
          navigate('/add')
        }} className='border border-blue bg-blue p-2 h-8 flex items-center text-white rounded'>+ Add Vehicle</button>

        <button className='bg-none' onClick={LogOut}>
          <ExitSvg width={'22px'} height={'22px'} color={"#fb7185"} />
        </button>
      </div>
    </header>
  )
}

export default Header