import React, { useEffect, useState } from 'react'
import { Card } from '../components'
import { axios } from '../lib'
import { useOutletContext } from 'react-router-dom'

const Home = () => {
  const { location, user } = useOutletContext()

  const [state, setState] = useState({
    vehicles: [],
    sort: "recent"
  })

  const LoadVehicles = async (offset, sort) => {

    if (state?.abortControll) {
      state?.abortControll?.abort()
    }

    const abortControll = new AbortController()

    setState((state) => ({
      ...state,
      abortControll
    }))

    try {
      let res = await axios.get('/vehicle/get_vehicles', {
        params: {
          search: new URLSearchParams(location?.search).get("search") || "",
          offset,
          sort: sort || state?.sort
        },
        signal: abortControll?.signal
      })

      if (offset && res?.['data']?.data) {
        setState((state) => ({
          ...state,
          vehicles: [...state.vehicles, ...res?.['data']?.data?.vehicles]
        }))
      } else if (res?.['data']?.data) {
        setState({ ...res?.['data']?.data, sort: sort || "recent" })
      }
    } catch (err) {
      if (err?.response?.data?.status == 405) {
        alert("Login")
        navigate('/login')
      } else if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }

  }

  const DeleteVehicle = async (id) => {
    if (state?.abortControll) {
      state?.abortControll?.abort()
    }

    const abortControll = new AbortController()

    setState((state) => ({
      ...state,
      abortControll
    }))

    try {
      let res = await axios.delete(`/vehicle/delete_vehicle/${id}`, {
        signal: abortControll.signal
      })

      if (res?.['data']) {
        LoadVehicles?.()
      }
    } catch (err) {
      if (err?.response?.data?.status == 405) {
        alert("Login")
        navigate('/login')
      } else if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    document.title = "Kale"

    if (user) {
      LoadVehicles?.()
    }

    return () => {
      state?.abortControll?.abort()
    }

  }, [location, user])

  return (
    <section data-page="home" className='p-3'>
      <div className="actions flex">
        <h1 className='text-lg text-black capitalize'>
          {state?.sort == 'recent' && "Recent"}
          {state?.sort == 'low' && "Low to High"}
          {state?.sort == 'high' && "Hight to Low"}
        </h1>

        <select onChange={(e) => {
          setState((state) => ({
            ...state,
            sort: e?.target?.value
          }))

          LoadVehicles(undefined, e?.target?.value)
        }} className='border border-grey mb-2 rounded-md text-black p-1 text-sm'>
          <option value="recent">Recent</option>
          <option value="low">Low to High</option>
          <option value="high">Hight to Low</option>
        </select>
      </div>

      <div className='items pb-3'>
        {state?.vehicles?.map((obj, key) => {
          return <Card onTrash={DeleteVehicle} data={obj} isTransf key={key} />
        })}
      </div>

      {
        state?.count > state?.vehicles?.length && <div className="loadmore flex items-center justify-items-center">
          <button onClick={() => {
            LoadVehicles(state?.vehicles?.length)
          }} className='m-auto border-2 border-blue text-blue rounded p-1 pl-6 pr-6 duration-500 transition ease-in-out hover:bg-blue hover:text-white'>More</button>
        </div>
      }
    </section>
  )
}

export default Home