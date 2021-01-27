import React, { useContext, useEffect, useState } from 'react'
import ProfilePicture from './ProfilePicture'
import { Context } from '../context/token'

import '../styles/userList.css'
import FollowButton from './FollowButton'
import { useHistory } from 'react-router-dom'

function UserList({ list }) {
    const [users, setUsers] = useState([])
    const { API, user: loggedUser } = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`${API}/user/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: list })
            })
            if (response.ok) {
                const data = await response.json()
                setUsers(data.results)
            }
        }

        if (list.length > 0 && users.length === 0) {
            getUsers()
        }
    }, [list, users, API])

    return (
        <div className='userList'>
            {
                list.length > 0 ?
                    users.map((user, i) => (
                        <div className='userCard--wrapper' key={i}>
                            <div className='userCard'>
                                <div className='userCard__picture'>
                                    <ProfilePicture url={user.photo} callback={() => {
                                        history.go(-2)
                                        setTimeout(() => {
                                            history.push(`profile/${user.name}`)
                                        }, 1000)
                                    }} />
                                </div>
                                <div className='userCard__main'>
                                    <div className='userCard__header'>
                                        <div className='userdCard__id'>
                                            <p className='displayName'>{user.display_name}</p>
                                            <p className='username'>@{user.name}</p>
                                        </div>
                                        {
                                            loggedUser['_id'] !== user['_id'] &&
                                            <FollowButton
                                                whom={user}
                                                updateOne={setUsers}
                                            />
                                        }

                                    </div>
                                    <p className='userCard__bio'>{user.bio}</p>
                                </div>
                            </div>

                        </div>
                    ))
                    :
                    <div className='noUsersFound'>
                        <p>Nenhum usuário encontrado</p>
                    </div>
            }
        </div>
    )
}

export default UserList