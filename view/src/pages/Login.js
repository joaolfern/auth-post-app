import React, { useState, useContext } from 'react'
import { Context } from '../context/token'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import '../styles/login.css'
import { Link } from 'react-router-dom'

function Login() {
    const { API, setToken } = useContext(Context)
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    function handleInput(e) {
        const { value, name } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))

    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await fetch(`${API}/user/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            })
            const data = await response.json()

            if (response.ok)
                setToken(data)
            else
                setErrorMessage(data)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className='login'>
            <FontAwesomeIcon className='login__icon' icon={faTwitter} />
            <h3 className='login__title'>Log in to Twitter</h3>

            <div className='login__field'>
                <label className='login__label'>email</label>
                <input
                    className='login__email login__input'
                    type='text'
                    name='email'
                    value={input.email}
                    onChange={handleInput}
                />
            </div>
            <div className='login__field'>
                <label className='login__label'>password</label>
                <input
                    className='login__password login__input'
                    type='password'
                    name='password'
                    value={input.password}
                    onChange={handleInput}
                />
            </div>

            <button
                className='login__button'
                onClick={handleLogin}
            >
                Log in
            </button>
            <Link className='login__signUp' to=''>Sign up for Twitter</Link>
            <p className='login__errorMessage'>{errorMessage}</p>
        </form>
    )
}

export default Login