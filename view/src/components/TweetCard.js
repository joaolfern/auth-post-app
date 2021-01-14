import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/token'

import ProfilePicture from './ProfilePicture'
import getTimeDiff from '../functions/getTimeDiff'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import {
    faRetweet,
    faHeart,
    faEllipsisH,
    faUserPlus,
    faBan,
    faVolumeMute,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'


import '../styles/tweetCard.css'

function TweetCard({ post, user, setPosts }) {

    const { API, token } = useContext(Context)
    const [author, setAuthor] = useState({
        photo: ''
    })
    const [showOptions, setShowOptions] = useState(false)
    const optionsRef = useRef(null)

    useEffect(() => {
        async function getAuthor() {
            const response = await fetch(`${API}/user/${post.user}`)
            const data = await response.json()

            if (response.ok)
                setAuthor(data[0])
        }

        if (!author.name)
            getAuthor()

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [optionsRef, API, author.name, post.user])

    function toggleOptions() {
        setShowOptions(true)

        document.addEventListener("mousedown", handleClickOutside)
    }

    function handleClickOutside(event) {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false)

            document.removeEventListener("mousedown", handleClickOutside)
        }
    }

    function isFollowed() {
        return user.following.some(followedUser => followedUser === author['_id'])
    }

    async function deleteTweet() {
        const response = await fetch(`${API}/post/${post['_id']}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token
            }
        })
        if (response.ok)
            setPosts(prev =>
                prev.filter(timelinePost => timelinePost['_id'] != post['_id'])
            )
    }

    const timeDiff = getTimeDiff(post.date)

    return (
        <div className='wrapper' key={post['_id']}>
            <div className='tweet'>
                <div className='tweet__profilePicture'>
                    <ProfilePicture url={author.photo} />
                </div>
                <div className='tweet__content'>
                    <div className='tweet__header'>
                        <h3 className='tweet__displayName'>{author['display_name']}</h3>
                        <h4 className='tweet__username'>@{author.name}</h4>
                        <p>· {timeDiff.label ? `${timeDiff.value} ${timeDiff.label}` : timeDiff}</p>
                        <FontAwesomeIcon
                            className='tweet__showOptions'
                            icon={faEllipsisH}
                            onClick={toggleOptions}
                        />

                    </div>
                    <p className='tweet__post'>{post.post}</p>
                    <div className='tweet__footer'>
                        <div className='tweet__footer__item tweet__footer__item--reply'>
                            <FontAwesomeIcon icon={faComment} />
                            <p>{post.replies.length}</p>
                        </div>
                        <div className='tweet__footer__item tweet__footer__item--retweet'>
                            <FontAwesomeIcon icon={faRetweet} />
                            <p>{post.retweets}</p>
                        </div>
                        <div className='tweet__footer__item tweet__footer__item--heart'>
                            <FontAwesomeIcon icon={farHeart} />
                            <p>{post.favorites}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='tweet__options'
                ref={optionsRef}
                style={{
                    transform: `scaleY(${showOptions ? 1 : 0})`
                }}
            >
                {author['_id'] !== user['_id'] ?
                    <>
                        {isFollowed() ?
                            <button className='options__btn'>
                                <FontAwesomeIcon
                                    className='options__icon'
                                    icon={faUserPlus}
                                />  Deixar de seguir @{author.name}
                            </button> :
                            <button className='options__btn'>
                                <FontAwesomeIcon
                                    className='options__icon'
                                    icon={faUserPlus}
                                />  Seguir @{author.name}
                            </button>
                        }
                        <button className='options__btn'>
                            <FontAwesomeIcon
                                className='options__icon'
                                icon={faUserPlus}
                            />  Seguir @{author.name}
                        </button>

                        <button className='options__btn'>
                            <FontAwesomeIcon
                                className='options__icon'
                                icon={faVolumeMute}
                            />  Silenciar @{author.name}
                        </button>
                        <button className='options__btn'>
                            <FontAwesomeIcon
                                className='options__icon'
                                icon={faBan}
                            />  Bloquear @{author.name}
                        </button>
                    </> :
                    <button onClick={deleteTweet} className='options__btn options__delete'>
                        <FontAwesomeIcon
                            className='options__icon options__delete'
                            icon={faTrashAlt}
                        />  Excluir
                    </button>
                }

            </div>
        </div>
    )
}

export default TweetCard