import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet";

import ProfilePicture from "../components/ProfilePicture"
import Tweetar from '../components/Tweetar'
import TweetCard from "../components/TweetCard"

import { Context } from '../context/token'
import '../styles/home.css'

function Home({ setVisibleTgSideBar }) {
    const {
        API,
        token,
        user,
        setUser,
        isFetched,
        setIsFetched,
        posts,
        setPosts,
        fetchPosts
    } = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {

        if (!isFetched) {
            fetchPosts(`post`, setPosts)
            setIsFetched(true)
        }

    }, [API, token, isFetched])

    const timeline = posts.map(post => (
        <TweetCard
            key={post['_id']}
            post={post}
            user={user}
            setPosts={setPosts}
        />
    ))

    return (
        <div className='home'>
            <Helmet>
                <title>Página Inicial / Twitter</title>
            </Helmet>
            <div className='header'>
                <div className='header__profilePicture'>
                    <ProfilePicture url={user.photo} callback={() => setVisibleTgSideBar(true)} />
                </div>
                <h1 className='header__title'>Página Inicial</h1>
            </div>
            <Tweetar customClass={{ container: 'home' }} />
            {timeline}
            <p>{errorMessage}</p>

        </div>

    )
}


export default Home