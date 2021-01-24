import React, { useContext, useEffect, useState } from 'react'

import ProfilePicture from './ProfilePicture'

import { Context } from '../context/token'
import { getTimeDiff } from '../functions/useDates'
import formatNumber from '../functions/formatNumber'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'

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
import { useHistory } from 'react-router-dom'

function TweetCard({ post, user, setPosts }) {
    const { API, token } = useContext(Context)
    const [author, setAuthor] = useState({
        photo: '',
        name: ''
    })
    const {
        ref: refOptions,
        visible: visibleOptions,
        setVisible: setVisibleOptions
    } = useHideOnOutsideClick()

    const history = useHistory()

    useEffect(() => {
        async function getAuthor() {
            const response = await fetch(`${API}/user/${post.user}`)
            const data = await response.json()

            if (response.ok)
                setAuthor(data[0])
        }

        if (!author.name)
            getAuthor()

    }, [API, author.name, post.user])

    function goToProfile() {
        history.push(`profile/${author.name}`)
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

    async function reactToTweet(action) {
        try {
            const actionPlural = action + 's'
            const response = await fetch(`${API}/post/${action}/${post['_id']}`, {
                method: 'PATCH',
                headers: {
                    'auth-token': token
                }
            })
            const data = await response.json()

            if (response.ok) {
                setPosts(prev => {
                    if (data.increased) {
                        return prev.map(item =>
                            item['_id'] === post['_id'] ?
                                { ...item, [actionPlural]: [...item[actionPlural], user['_id']] }
                                : item
                        )
                    }
                    return prev.map(item =>
                        item['_id'] === post['_id'] ?
                            { ...item, [actionPlural]: item[actionPlural].filter(record => record !== user['_id']) }
                            : item
                    )
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    function isThereAReaction(action) {
        return post[action + 's'].some(liked => liked === user['_id'])
    }

    const timeDiff = getTimeDiff(post.date)

    return (
        <div className='wrapper' key={post['_id']}>
            <div className='tweet'>
                <div className='tweet__profilePicture'>
                    <ProfilePicture url={author.photo} callback={goToProfile} />
                </div>
                <div className='tweet__content'>
                    <div className='tweet__header'>
                        <h3 className='displayName'>{author['display_name']}</h3>
                        <h4 className='username'>@{author.name}</h4>
                        <p>· {timeDiff.label ? `${timeDiff.value} ${timeDiff.label}` : timeDiff}</p>
                        <FontAwesomeIcon
                            className='tweet__showOptions'
                            icon={faEllipsisH}
                            onClick={() => {
                                setVisibleOptions(true)
                            }}
                        />

                    </div>
                    <p className='tweet__post'>{post.post}</p>
                    <div className='tweet__footer'>
                        <div className='tweet__footer__item tweet__footer__item--reply'>
                            <FontAwesomeIcon className='tweet__footer__item__icon' icon={faComment} />
                            <p className='tweet__footer__item__label'>{post.replies.length ? formatNumber(post.replies.length) : ''}</p>
                        </div>
                        <div className={
                            `tweet__footer__item tweet__footer__item--retweet ${isThereAReaction('retweet') ? 'retweet--retweeted' : ''}`}
                        >
                            <FontAwesomeIcon className='tweet__footer__item__icon'
                                onClick={() => reactToTweet('retweet')}
                                icon={faRetweet}
                            />
                            <p className='tweet__footer__item__label'>{post.retweets.length ? formatNumber(post.retweets.length) : ''}</p>
                        </div>
                        <div
                            className={
                                `tweet__footer__item tweet__footer__item--heart ${isThereAReaction('like') ? 'heart--liked' : ''}`}
                        >
                            <FontAwesomeIcon className='tweet__footer__item__icon'
                                onClick={() => reactToTweet('like')}
                                icon={isThereAReaction('like') ? faHeart : farHeart}
                            />
                            <p className='tweet__footer__item__label'>{post.likes.length ? formatNumber(post.likes.length) : ''}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='tweet__options'
                ref={refOptions}
                style={{
                    transform: `scaleY(${visibleOptions ? 1 : 0})`
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