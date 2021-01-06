import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/token'
import ProfilePicture from './ProfilePicture'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import '../styles/tweetCard.css'

function TweetCard({ post }) {
    const { API } = useContext(Context)
    const [user, setUser] = useState({
        photo: ''
    })

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`${API}/user/${post.user}`)
            const data = await response.json()

            if (response.ok)
                setUser(data[0])
        }
        if (!user.name)
            getUser()
    }, [])

    return (
        <div key={post['_id']}>
            <div className='tweet'>
                <div className='tweet__profilePicture'>
                    <ProfilePicture url={user.photo} />
                </div>
                <div className='tweet__content'>
                    <div className='tweet__header'>
                        <h3 className='tweet__displayName'>{user['display_name']}</h3>
                        <h4 className='tweet__username'>@{user.name}</h4>
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


        </div>
    )
}

export default TweetCard