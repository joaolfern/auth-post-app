import React from 'react'
import { Link } from 'react-router-dom'
import formatNumber from '../functions/formatNumber'

function FollowingStatus({ following, followers, username, path = `profile/${username}`, callback = () => { } }) {
    return (
        <div className='followingStatus'>
            <Link to={`${path}/following`} className='underline' onClick={callback}>
                <span className='followingStatus__number'>{formatNumber(following)} </span>
                Seguindo
            </Link>
            <Link to={`${path}/followers`} className='underline' onClick={callback}>
                <span className='followingStatus__number'>{formatNumber(followers)} </span>
                Seguidores
            </Link>
        </div>
    )
}

export default FollowingStatus