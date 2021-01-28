import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import ProfilePicture from '../components/ProfilePicture'

import { Context } from '../context/token'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'

import '../styles/explore.css'

function Explore({ hideBar = false }) {
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])
    const { API, token } = useContext(Context)

    const {
        ref: refUsers,
        setVisible: setVisibleUsers,
        visible: visibleUsers
    } = useHideOnOutsideClick(true)

    async function searchUsers(value) {
        const response = await fetch(`${API}/user/${value}`, {
            headers: {
                'auth-token': token
            }
        })
        if (response.ok) {
            const data = await response.json()
            if (value)
                setUsers(data)
            else
                setUsers([])
        }
    }

    function handleInput(e) {
        const { value } = e.target
        setInput(value)
        searchUsers(value.trim())
    }

    return (
        <div className='explore'>
            {
                !hideBar &&
                <>
                    <div className='searchBar' ref={refUsers}>
                        <input
                            type='text'
                            placeholder='Buscar no Twitter'
                            className='searchBar__input'
                            value={input}
                            onChange={handleInput}
                            onClick={() => setVisibleUsers(true)}
                        />
                        <FontAwesomeIcon className='searchBar__icon' icon={faSearch} />
                    </div>
                    {
                        (users.length > 0 && visibleUsers) &&
                        <div className='explore__users' >
                            {
                                users.map((user, i) => (
                                    <Link to={`/profile/${user.name}`} className='explore__userCard' key={i}>
                                        <div className='explore__userCard__photo'>
                                            <ProfilePicture url={user.photo} />
                                        </div>
                                        <div className='explore__userCard__id noUnderline'>
                                            <p className='displayName noUnderline'>{user.display_name}</p>
                                            <p className='username noUnderline'>@{user.name}</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </>
            }

        </div>
    )
}

export default Explore