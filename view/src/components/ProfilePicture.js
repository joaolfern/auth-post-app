import React from 'react'

function ProfilePicture({
    url = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    callback = () => { },
    children

}) {
    return (
        <button
            className='profilePicture'
            style={{ backgroundImage: `url(${url})` }}
            onClick={() => callback()}
        >
            {children}
        </button>
    )
}

export default ProfilePicture