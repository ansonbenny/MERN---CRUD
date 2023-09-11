import React, { useEffect, useState } from 'react'
import { Item } from '../components'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { axios } from '../lib';

const Product = () => {
    const { user, location } = useOutletContext()

    const { id } = useParams()

    const navigate = useNavigate()

    const [state, setState] = useState({})

    useEffect(() => {
        document.title = "Kale - Product"

        const abortControll = new AbortController()

        if (user && id) {
            (async () => {
                try {
                    let res = await axios.get(`/vehicle/get_vehicle/${id}`, {
                        signal: abortControll?.signal
                    })

                    if (res?.['data']?.data) {
                        setState(res?.['data']?.data)
                    }
                } catch (err) {
                    if (err?.code !== "ERR_CANCELED") {
                        alert(err?.response?.data?.message)

                        navigate('/')
                    }
                }
            })();
        }

        return () => {
            abortControll.abort()
        }
    }, [user, location])

    return (
        <section data-page="product" className='p-3'>
            <Item data={state} />
        </section>
    )
}

export default Product