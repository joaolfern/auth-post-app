import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../context/token'

import UserList from '../components/UserList'

function FollowSuggestion() {
    const [users, setUsers] = useState([])

    const { API, token } = useContext(Context)

    useEffect(() => {
        async function getSuggestion() {
            const response = await fetch(`${API}/user/suggest`, {
                headers: {
                    "auth-token": token
                }
            })
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            }
        }
        if (users.length === 0) {
            getSuggestion()
        }
    }, [users])

    console.log(users)

    return (

        users.length > 0 &&

        <div className='suggestion'>
            <h2 className='suggestion__title'>Quem seguir</h2>
            <UserList list={users} customClasses={{
                userCard: 'suggestion'
            }} />
        </div>

    )
}

export default FollowSuggestion