import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../context/token'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import InputField from '../components/InputField'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import '../styles/login.css'
import '../styles/general.css'

function Login() {
  const { API, setToken, parseMessage, token } = useContext(Context)
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      const data = await response.json()

      if (response.ok) {
        setToken(data)
      }
      else
        setErrorMessage(parseMessage(data))

    } catch (e) {
      console.log(e)
      console.log('not ')
    }
  }

  useEffect(() => {
    return () => {
      setInput({
        email: '',
        password: ''
      })
      setErrorMessage('')
    }
  }, [])

  return (
    <form className='login'>
      {token && <Redirect to='/' />}
      <Helmet>
        <title>Login on Twitter</title>
      </Helmet>
      <FontAwesomeIcon className='login__icon' icon={faTwitter} />
      <h3 className='login__title'>Log in to Twitter</h3>
      <div className='login__input'>
        <InputField
          name='email'
          input={input}
          setInput={setInput}
        />
        <InputField
          name='password'
          input={input}
          setInput={setInput}
        />
      </div>


      <button
        className='login__button blueButton'
        onClick={handleLogin}
      >
        Log in
      </button>
      <Link className='login__signUp' to='/sign-up'>Sign up for Twitter</Link>

      <p className='login__errorMessage'>{errorMessage}</p>
    </form>
  )
}

export default Login