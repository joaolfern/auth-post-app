import React, { useContext, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import ProfilePicture from '../components/ProfilePicture'

import { Context } from '../context/token'

import '../styles/tweetar.css'

function Tweetar({ customClass, setVisible }) {

    const {
        API,
        token,
        user,
        setIsFetched
    } = useContext(Context)
    const [postInput, setPostInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        const { value } = e.target

        setPostInput(value)
    }

    async function handleTweet() {
        const reqJson = {
            "post": postInput
        }

        const response = await fetch(`${API}/post`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(reqJson)
        })

        if (response.ok) {
            setPostInput('')
            setErrorMessage('')
            setIsFetched(false)
            if (setVisible)
                setVisible(false)
        }
        else {
            const data = await response.json()
            setErrorMessage(data)
        }
    }

    return (
        <div className={`tweetar ${customClass.container ?
            customClass.container + '__tweetar' :
            ''
            }`}>

            <p>{errorMessage}</p>
            <div className={`tweetar__header `}>
                <div className='tweetar__profilePicture'>
                    <ProfilePicture url={user.photo} />
                </div>
                <TextareaAutosize
                    value={postInput}
                    onChange={handleChange}
                    placeholder='O que está acontecendo?'
                    className={
                        `tweetar__input ${customClass.input ?
                            customClass.input + '__tweetar__input' : ''
                        }`}
                    maxRows={7}
                />
            </div>
            <div className='tweetar__footer'>
                <button className={`blueButton tweetar__button ${customClass.button ?
                    customClass.button + '__tweetar__button' : ''
                    }`} onClick={handleTweet}>
                    Tweetar
                </button>
            </div>
        </div>
    )

}

export default Tweetar