import React, { useEffect } from 'react'
import { Card } from '../components'

const Home = () => {
  useEffect(() => {
    document.title = "Kale"
  }, [])

  return (
    <section data-page="home" className='p-3'>
      <div className="actions flex">
        <h1 className='text-lg text-black capitalize'>Recent</h1>

        <select className='border border-grey mb-2 rounded-md text-black p-1 text-sm'>
          <option value="recent">Recent</option>
          <option value="low">Low to High</option>
          <option value="high">Hight to Low</option>
        </select>
      </div>

      <div className='items pb-3'>
        {[1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((obj, key) => {
          return <Card isTransf key={key} />
        })}
      </div>

      <div className="loadmore flex items-center justify-items-center">
        <button className='m-auto border-2 border-blue text-blue rounded p-1 pl-6 pr-6 duration-500 transition ease-in-out hover:bg-blue hover:text-white'>More</button>
      </div>
    </section>
  )
}

export default Home