import React from 'react'

function ProfilePicture({
    url,
    callback = () => { },
    children

}) {
    return (
        <button
            className='profilePicture'
            style={{ backgroundImage: `url(${url || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'})` }}
            onClick={() => callback()}
        >
            {children}
        </button>
    )
}

export default ProfilePicture