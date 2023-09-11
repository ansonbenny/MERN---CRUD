import React, { useState } from 'react'
import { Input } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from '../../lib'
import './style.scss'

const Login = () => {
  const [state, setState] = useState({});

  const navigate = useNavigate()

  const onInputHandle = (e) => {
    setState((state) => ({
      ...state,
      [e?.target?.name]: e?.target?.value
    }))
  }

  const FormHandle = async (e) => {
    e?.preventDefault?.();

    if (state?.password?.length >= 8) {
      try {
        let res = await axios.get('/user/login', {
          params: state
        })

        if (res?.['data']?.data) {
          navigate("/")
        }
      } catch (err) {
        alert(err?.response?.data?.message || "Something went wrong")
      }
    } else {
      alert("Password Length Must 8 or Higher.")
    }
  }

  return (
    <section data-page='auth'>
      <div className='box'>
        <h1 className='title'>Login</h1>

        <form onSubmit={FormHandle}>
          <div className='col'>
            <Input
              value={state?.email || ''}
              name={'email'}
              type={'email'}
              placeholder={'Email'}
              onInput={onInputHandle}
              isRequire
            />
          </div>

          <div className='col'>
            <Input
              value={state?.password || ''}
              name={'password'}
              type={'password'}
              placeholder={'Password'}
              onInput={onInputHandle}
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