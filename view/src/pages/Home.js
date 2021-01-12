import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet";

import ProfilePicture from "../components/ProfilePicture"
import Tweetar from '../components/Tweetar'
import TweetCard from "../components/TweetCard"

import { Context } from '../context/token'
import '../styles/home.css'

function Home() {
    const {
        API,
        token,
        logOff,
        user,
        setUser,
        isFetched,
        setIsFetched
    } = useContext(Context)
    const [posts, setPosts] = useState([])
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
                <div className='header__wrapper'>
                    <div className='header__profilePicture'>
                        <ProfilePicture url={user.photo} />
                    </div>
                    <h1 className='header__title'>Página Inicial</h1>
                </div>
                <Tweetar />
            </header>
            {
                timeline
            }
            <p>{errorMessage}</p>

        </div>

    )
}


export default Home