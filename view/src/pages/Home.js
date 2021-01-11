import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet";

import TextareaAutosize from 'react-textarea-autosize'
import ProfilePicture from "../components/ProfilePicture"
import TweetCard from "../components/TweetCard"

import { Context } from '../context/token'
import '../styles/home.css'

function Home() {
    const { API, token, logOff } = useContext(Context)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({ photo: '' })
    const [isFetched, setIsFetched] = useState(false)
    const [postInput, setPostInput] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getData(url, setter) {
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            })

            const data = await response.json()
            if (response.ok)
                setter(data)
            else
                setErrorMessage(data)
        }

        if (!isFetched) {
            getData(`${API}/post`, setPosts)
            getData(`${API}/user/profile`, setUser)
            setIsFetched(true)
        }
    }, [posts, API, token, isFetched])

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
            setIsFetched(false)
            setPostInput('')
            setErrorMessage('')
        }
        else {
            const data = await response.json()
            setErrorMessage(data)
        }
    }

    const timeline = posts.map(post => (
        <TweetCard
            key={post['_id']}
            post={post} user={user}
            setPosts={setPosts}
        />
    ))

    return (
        <div className='home'>
            <Helmet>
                <title>Página Inicial / Twitter</title>
            </Helmet>
            <p onClick={logOff}>logOff</p>
            <header className='home__header'>
                <h1 className='home__title'>Página Inicial</h1>
                <div className='home__tweetar'>
                    <div className='tweetar__header'>
                        <div className='home__profilePicture'>
                            <ProfilePicture url={user.photo} />
                        </div>
                        <TextareaAutosize
                            value={postInput}
                            onChange={handleChange}
                            placeholder='O que está acontecendo?'
                            className='tweetar__input'
                        />
                    </div>
                    <div className='tweetar__footer'>

                        <button
                            className='blueButton tweetar__button'
                            onClick={handleTweet}
                        >
                            Tweetar
                        </button>
                    </div>
                </div>
            </header>
            {
                timeline
            }
            <p>{errorMessage}</p>

        </div>

    )
}


export default Home