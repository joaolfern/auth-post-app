import React, { useContext, useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { Context } from '../context/token'
import InputField from '../components/InputField'
import DateInput from '../components/DateInput'

import '../styles/signUp.css'
import ProfilePicture from '../components/ProfilePicture'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import useUploadImage from '../hooks/useUploadImage'
import { userConsumer } from '../controllers'
import LoadingSpinner from '../components/LoadingSpinner'
import LoadableSection from '../components/LoadableSection'

function SignUp() {
  const inpFileRef = useRef(null)
  const { API, parseMessage, setToken, token } = useContext(Context)
  const [input, setInput] = useState({
    name: '',
    email: '',
    birth: {
      day: '',
      month: '',
      year: ''
    },
    photoId: ''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(0)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const {
    ref: refPhoto,
    updatePhoto,
    photoUrl,
    photoFile
  } = useUploadImage()

  useEffect(() => {
    return () => {
      inpFileRef.current = null
      setInput({
        name: '',
        email: '',
        birth: {
          day: '',
          month: '',
          year: ''
        },
        password: '',
        photo: ''
      })
      setErrorMessage('')
      setStep(0)
    }
  }, [])

  function nextStep() {
    setErrorMessage('')
    setStep(prev => prev + 1)
  }

  async function onSubmit() {
    setLoadingSubmit(true)
    const { birth, name, email, password } = input
    if (Object.values(birth).some(value => !value)) {
      setErrorMessage("Invalid date")
      return
    }

    const reqData = {
      step
    }

    if (birth.year && birth.month && birth.day) reqData.date_of_birth = new Date(birth.year, birth.month - 1, birth.day)
    if (password) reqData.password = password
    if (email) reqData.email = email
    if (name) reqData.display_name = name
    if (photoUrl) reqData.photo_url = photoUrl

    try {
      await userConsumer.create(reqData)
      if (step === 2) {
        const loginJson = {
          email,
          password
        }

        const loginResponse = await fetch(`${API}/user/login`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginJson)
        })
        const loginData = await loginResponse.json()
        setToken(loginData)
      }
      nextStep()
      return
    } catch (err) {
      setErrorMessage(parseMessage(err.message))
    } finally {
      setLoadingSubmit(false)
    }
  }

  async function storeImage() {
    if (!photoFile) {
      onSubmit()
      return
    }
    const photo = new FormData()
    photo.append('photo', photoFile)

    const imageResponse = await fetch(`${API}/user/image`, {
      body: photo,
      method: 'POST'
    })

    const imageData = await imageResponse.json()

    if (imageResponse.ok) {
      onSubmit(imageData.url)
    }
    else {
      setErrorMessage(imageData)
    }
  }

  return (
    <div className='signUp'>
      {token && <Redirect to='/' />}
      <Helmet>
        <title>Sign up for Twitter / Twitter</title>
      </Helmet>
      <FontAwesomeIcon className='signUp__icon' icon={faTwitter} />
      <button
        className='signUp__button blueButton'
        onClick={step === 0 ? onSubmit : step === 1 ? onSubmit : storeImage}
      >
        Next
      </button>

      <div className='signUp__pages'>
        {
          step === 0 ?
            <section className='signUp__one'>
              <h3 className='signUp__title'>Create your account</h3>
              <form className='signUp__form'>
                <InputField
                  input={input}
                  setInput={setInput}
                  name='name'
                />

                <InputField
                  input={input}
                  setInput={setInput}
                  name='email'
                />

                <h5 className='signUp__birth__title'>Date of birth</h5>
                <p className='signUp__birth__text'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>

                <div className='signUp__date'>
                  <DateInput
                    input={input}
                    setInput={setInput}
                    name='month'
                    obj='birth'
                  />
                  <DateInput
                    input={input}
                    setInput={setInput}
                    name='day'
                    obj='birth'
                  />
                  <DateInput
                    input={input}
                    setInput={setInput}
                    name='year'
                    obj='birth'
                  />
                </div>
              </form>

            </section>
            :
            step === 1 ?
              <section className='signUp__one'>
                <h3 className='signUp__title'>You'll need a password</h3>
                <p className='signUp__birth__text'>Make sure it’s 8 characters or more.</p>

                <InputField
                  input={input}
                  setInput={setInput}
                  name='password'
                />
              </section>
              :
              <section className='signUp__one'>
                <LoadableSection isLoading={loadingSubmit}>
                  <h3 className='signUp__title'>Pick a pofile picture</h3>
                  <p className='signUp__birth__text'>Have a favorite selfie? Upload it now.</p>
                  <input
                    ref={refPhoto}
                    style={{ display: 'none' }}
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={updatePhoto}
                    name={'photo'}
                  />
                  <div className='signUp__picture'>
                    <ProfilePicture url={photoUrl} callback={() => refPhoto.current.click()}>
                      {<FontAwesomeIcon className='uploadPhotoIcon' icon={faCamera} />}
                    </ProfilePicture>
                  </div>
                </LoadableSection>
              </section>
        }
        <p className='login__errorMessage'>{errorMessage}</p>
      </div>
    </div>
  )
}

export default SignUp