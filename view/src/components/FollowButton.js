import React, { useContext } from 'react'
import { Context } from '../context/token'

function FollowButton({ whom = { followers: '' }, setWhom, updateOne }) {
    const { API, token, user, setUser } = useContext(Context)

    async function handleFollow() {
        try {
            const response = await fetch(`${API}/user/follow/${whom['_id']}`, {
                method: 'PATCH',
                headers: {
                    'auth-token': token
                }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.undone) {
                    if (setWhom)
                        setWhom(prev => ({
                            ...prev, followers: [...prev.followers.filter(follower =>
                                follower['_id'] === user['_id']
                            )]
                        }))

                    if (updateOne) {
                        updateOne(prev => prev.map(item =>
                            item['_id'] === whom['_id'] ?
                                {
                                    ...item, followers: item.followers.filter(follower =>
                                        follower['_id'] === user['_id']
                                    )
                                }
                                : item
                        ))
                    }
                    setUser(prev => ({
                        ...prev, following: [...prev.following.filter(followed =>
                            followed['_id'] === whom['_id']
                        )]
                    }))
                } else {
                    if (setWhom)
                        setWhom(prev => ({ ...prev, followers: [...prev.followers, user['_id']] }))
                    if (updateOne)
                        updateOne(prev => prev.map(item => item['_id'] === whom['_id'] ?
                            { ...item, followers: [...item.followers, user['_id']] }
                            : item
                        ))
                    setUser(prev => ({ ...prev, following: [...prev.following, whom['_id']] }))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button
            className={`profile__header__button profile__follow 
                                ${whom.followers.includes(user['_id']) ? 'followingLabel' : ''}`
            }
            onClick={handleFollow}
        >
            {
                whom.followers.includes(user['_id']) ?
                    '' : 'Seguir'
            }
        </button>
    )
}

export default FollowButton