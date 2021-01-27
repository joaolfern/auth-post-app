import React from 'react'
import { Link } from 'react-router-dom'
import formatNumber from '../functions/formatNumber'

function FollowingStatus({ following, followers, username, path = `profile/${username}`, callback = () => { } }) {
    return (
        <div className='followingStatus'>
            <Link to={`${path}/following`} onClick={callback}>
                <span className='followingStatus__number'>{formatNumber(following)} </span>
                Seguindo
            </Link>
            <Link to={`${path}/followers`} onClick={callback}>
                <span className='followingStatus__number'>{formatNumber(followers)} </span>
                Seguidores
            </Link>
        </div>
    )
}

export default FollowingStatus