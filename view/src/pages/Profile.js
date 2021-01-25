import { faArrowLeft, faCalendarAlt, faLink, faMapPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/token'
import { Link, useParams } from 'react-router-dom'

import formatNumber from '../functions/formatNumber'
import ProfilePicture from '../components/ProfilePicture'
import TweetCard from '../components/TweetCard'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'
import ShadedBox from '../components/ShadedBox'

import { getMonthYear } from '../functions/useDates'

import '../styles/profile.css'

function Profile() {
    const [whose, setWhose] = useState({ posts: [], followers: [], following: [] })
    const { API, user, setUser, token } = useContext(Context)
    const { name } = useParams()
    const [posts, setPosts] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const {
        ref: refEdit,
        visible: visibleEdit,
        setVisible: setVisibleEdit
    } = useHideOnOutsideClick()

    useEffect(() => {
        async function getWhose() {
            const response = await fetch(`${API}/user/${name}`)

            if (response.ok) {
                const data = await response.json()
                setWhose(data[0])

            }
        }

        async function getPosts() {
            const response = await fetch(`${API}/post/profile/${whose['_id']}`)

            if (response.ok) {
                const data = await response.json()
                setPosts(data.results)
            }
        }

        if (name !== whose.name) {
            getWhose()
            setIsFetched(false)
        }

        if (!whose.name) {
            getWhose()
        }

        if (whose.name && !isFetched) {
            getPosts()
            setIsFetched(true)
        }


    }, [whose, isFetched, name])



    async function handleFollow() {
        try {
            const response = await fetch(`${API}/user/follow/${whose['_id']}`, {
                method: 'PATCH',
                headers: {
                    'auth-token': token
                }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.undone) {
                    setWhose(prev => ({
                        ...prev, followers: [...prev.followers.filter(follower =>
                            follower['_id'] === user['_id']
                        )]
                    }))
                    setUser(prev => ({
                        ...prev, following: [...prev.following.filter(followed =>
                            followed['_id'] === whose['_id']
                        )]
                    }))
                } else {
                    setWhose(prev => ({ ...prev, followers: [...prev.followers, user['_id']] }))
                    setUser(prev => ({ ...prev, following: [...prev.following, whose['_id']] }))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='profile'>

            <div className='navHeader profile__header'>
                <Link
                    className='navHeader__icon profile__header__icon'
                    to='/'
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div className='profile__header__desc'>
                    <p className='profile__header__desc__name'>{whose.display_name}</p>
                    <p className='profile__header__desc__tweets'>{whose.posts && formatNumber(whose.posts.length)} Tweets</p>
                </div>
            </div>
            <div className='profile__photos'>
                <div
                    className='profile__photos__cover'
                    style={{
                        backgroundColor: 'var(--secondary-bg-color)',
                        backgroundImage: `url(${whose.cover})`
                    }}
                ></div>
                <div className='profile__photos__picture'>
                    <ProfilePicture url={whose.photo} />
                </div>
            </div>
            {
                whose['_id'] === user['_id'] ?
                    <button
                        className='profile__header__button'
                        onClick={() => setVisibleEdit(true)}
                    >
                        Editar perfil
                    </button> :
                    <button
                        className={`profile__header__button profile__follow 
                        ${whose.followers.includes(user['_id']) ? 'followingLabel' : ''}`
                        }
                        onClick={handleFollow}
                    >
                        {
                            whose.followers.includes(user['_id']) ?
                                '' : 'Seguir'
                        }
                    </button>
            }
            <div className='profile__details'>
                <div className='profile__id'>
                    <p className='displayName'>{whose.display_name}</p>
                    <p className='username'>@{whose.name}</p>
                </div>
                {
                    whose.bio &&
                    <p className='profile__bio'>{whose.bio}</p>
                }
                <div className='profile__details__more'>
                    {
                        whose.location &&
                        <div className='details__more__item'>
                            <FontAwesomeIcon icon={faMapPin} />
                            <p>{whose.location}</p>
                        </div>
                    }
                    {
                        whose.website &&
                        <div className='details__more__item'>
                            <FontAwesomeIcon icon={faLink} />
                            <a
                                className='details__more__website'
                                href={whose.website}
                                target='_blank'>{whose.website}
                            </a>
                        </div>
                    }
                    <div className='details__more__item'>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <p>Ingressou em {whose.createdAt && getMonthYear(whose.createdAt)}</p>
                    </div>
                </div>
                <div className='followingStatus'>
                    <p>
                        <span className='followingStatus__number'>{
                            whose.following && formatNumber(whose.following.length)
                        } </span>
                            Seguindo
                    </p>
                    <p>
                        <span className='followingStatus__number'>{
                            whose.followers && formatNumber(whose.followers.length)
                        } </span>
                            Seguidores
                    </p>
                </div>
            </div>
            <nav className='profile__nav'>
                <button className='profile__nav__item'>Tweets</button>
                <button className='profile__nav__item'>Tweets e respostas</button>
                <button className='profile__nav__item'>Mídia</button>
                <button className='profile__nav__item'>Curtidas</button>
            </nav>

            <div className='profile__posts'>
                {
                    posts.map(post => (
                        <TweetCard
                            key={post['_id']}
                            post={post}
                            user={whose}
                            setPosts={setPosts}
                        />
                    ))
                }
            </div>
            <ShadedBox condition={visibleEdit}></ShadedBox>
            <div>

            </div>
        </div >
    )
}

export default Profile