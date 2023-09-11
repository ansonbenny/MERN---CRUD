import React from 'react'
import { Input } from '../../components'
import { Link } from 'react-router-dom'
import './style.scss'

const Login = () => {
  return (
    <section data-page='auth'>
      <div className='box'>
        <h1 className='title'>Login</h1>

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
            Login
          </button>

          <Link to={'/forgot'} className='forgot'>
            Forgot password?
          </Link>

          <Link to={'/register'}>Need an account? SIGN UP</Link>
        </form>
      </div>
    </section>
  )
}

export default Login