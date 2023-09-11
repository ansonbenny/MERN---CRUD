import React from 'react'
import { Input } from '../../components'
import { Link } from 'react-router-dom'
import './style.scss'

const Forgot = () => {
    return (
        <section data-page='auth'>
            <div className='box'>
                <h1 className='title'>Forgot</h1>

                <form action="">
                    <div className='col'>
                        <Input
                            name={'email'}
                            type={'email'}
                            placeHolder={'Email'}
                            isRequire
                        />
                    </div>

                    <div className='col'>
                        <Input
                            name={'password'}
                            type={'password'}
                            placeHolder={'Password'}
                            isRequire
                        />
                    </div>

                    <button type='submit'>
                        Forgot
                    </button>

                    <Link to={'/login'}>Remember password? LOGIN</Link>
                </form>
            </div>
        </section>
    )
}

export default Forgot