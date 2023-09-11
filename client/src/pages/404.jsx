import React, { useEffect } from 'react'

const Error = () => {
    useEffect(()=>{
        document.title = "Kale - 404";
    },[])
    return (
        <section data-page="error"
            style={{ height: "100vh" }}
            className="flex flex-col">
            <div className='m-auto text-center'>
                <h1 className='text-3xl font-bold text-grey_black'>404</h1>
                <p className='text-sm text-grey_black'>Sorry this page is doesn't exists.</p>
            </div>
        </section>
    )
}

export default Error