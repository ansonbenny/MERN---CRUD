import React from 'react'
import { Input } from '../../components'
import { Link } from 'react-router-dom'
import './style.scss'

const Register = () => {
  return (
    <section data-page='auth'>
      <div className='box'>
        <h1 className='title'>Sign Up</h1>

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
            Sign UP
          </button>

          <Link to={'/login'}>Already an account? LOGIN</Link>
        </form>
      </div>
    </section>
  )
}

export default Register