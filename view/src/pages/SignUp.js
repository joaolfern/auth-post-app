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
        password: '',
        photoId: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(0)
    const [photoUrl, setPhotoUrl] = useState('')
    const [photoFile, setPhotoFile] = useState(null)

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
            setPage(0)
        }
    }, [])

    function nextPage() {
        setErrorMessage('')
        setPage(prev => prev + 1)
    }

    async function signUpValidation1() {
        if (Object.values(input.birth).some(value => value == false)) {// eslint-disable-line 
            setErrorMessage("Invalid date")
            return
        }

        const reqJson = {
            "display_name": input.name,
            "email": input.email,
            "date_of_birth": new Date(input.birth.year, input.birth.month - 1, input.birth.day)
        }

        const response = await fetch(`${API}/user/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(reqJson)
        })

        const data = await response.json()

        if (response.ok) {
            nextPage()
            return
        }
        setErrorMessage(parseMessage[data] || data)
    }

    async function signUpValidation2() {
        const reqJson = {
            "display_name": input.name,
            "email": input.email,
            "date_of_birth": new Date(input.birth.year, input.birth.month - 1, input.birth.day),
            "password": input.password
        }

        const response = await fetch(`${API}/user/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(reqJson)
        })

        const data = await response.json()

        if (response.ok) {
            nextPage()
            return
        }
        setErrorMessage(parseMessage[data] || data)
    }

    async function updatePhoto(e) {
        const file = e.target.files[0]
        const reader = new FileReader()

        setPhotoFile(file)

        reader.addEventListener('load', function () {
            setPhotoUrl(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    async function storeImage() {
        if (!photoFile) {
            storeSignUp()
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
            storeSignUp(imageData.url)
        }
        else {
            setErrorMessage(imageData)
        }
    }

    async function storeSignUp(photoUrl = '') {
        const reqJson = {
            "display_name": input.name,
            "email": input.email,
            "date_of_birth": new Date(input.birth.year, input.birth.month - 1, input.birth.day),
            "password": input.password,
            "photo": photoUrl
        }

        const userResponse = await fetch(`${API}/user/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(reqJson)
        })

        const data = await userResponse.json()
        if (userResponse.ok) {
            const loginJson = {
                "email": input.email,
                "password": input.password
            }
            const loginResponse = await fetch(`${API}/user/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginJson)
            })
            const loginData = await loginResponse.json()
            setToken(loginData)
        }
        setErrorMessage(parseMessage[data] || data)
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
                onClick={page === 0 ? signUpValidation1 : page === 1 ? signUpValidation2 : storeImage}
            >
                Next
            </button>

            <div className='signUp__pages'>
                {
                    page == 0 ? // eslint-disable-line 
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
                        page == 1 ?
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
                                <h3 className='signUp__title'>Pick a pofile picture</h3>
                                <p className='signUp__birth__text'>Have a like selfie? Upload it now.</p>

                                <input
                                    ref={inpFileRef}
                                    style={{ display: 'none' }}
                                    type="file"
                                    accept=".jpeg, .png, .jpg"
                                    onChange={updatePhoto}
                                    name={'photo'}
                                />
                                <div className='signUp__picture'>
                                    <ProfilePicture url={photoUrl} callback={() => inpFileRef.current.click()}>
                                        {<FontAwesomeIcon className='signUp__picture__icon' icon={faCamera} />}
                                    </ProfilePicture>
                                </div>
                            </section>
                }
                <p className='login__errorMessage'>{errorMessage}</p>
            </div>
        </div>
    )
}

export default SignUp