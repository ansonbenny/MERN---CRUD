import React, { useState } from 'react'
import { Input } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from '../../lib'
import './style.scss'

const Forgot = () => {
    const [state, setState] = useState();

    const navigate = useNavigate()

    const onInputHandle = (e) => {
        if (e?.target?.name == 'email') {
            setState((state) => ({
                ...state,
                email: e?.target?.value,
                otp: '',
                isOTP: false
            }))
        } else {
            setState((state) => ({
                ...state,
                [e?.target?.name]: e?.target?.value
            }))
        }
    }

    const FormHandle = async (e, isResend) => {
        e?.preventDefault?.();

        if (state?.password?.length >= 8) {
            try {
                if (isResend || !state?.isOTP) {
                    let res = await axios.post('/user/forgot', state)

                    if (res?.['data']?.data) {
                        setState((state) => ({
                            ...state,
                            isOTP: true
                        }))
                    }
                } else {
                    let res = await axios.put('/user/forgot-verify', state)

                    if (res?.['data']) {
                        navigate('/login')
                    }
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
                <h1 className='title'>Forgot</h1>

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

                    {
                        state?.isOTP && <div className="col">
                            <Input
                                value={state?.otp || ''}
                                name={'otp'}
                                type={'number'}
                                placeholder={'OTP'}
                                onInput={onInputHandle}
                                isRequire
                            />

                            <button type='button' onClick={() => {
                                FormHandle(undefined, true)
                            }} className='text-xs pt-1 ml-auto text-red'>
                                Resend
                            </button>
                        </div>
                    }

                    <button type='submit'>
                        {
                            state?.isOTP ? 'Forgot' : 'Send OTP'
                        }
                    </button>

                    <Link to={'/login'}>Remember password? LOGIN</Link>
                </form>
            </div>
        </section>
    )
}

export default Forgot