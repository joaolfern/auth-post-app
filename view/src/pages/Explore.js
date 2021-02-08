import React, { useContext, useEffect, useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Route, useHistory, useParams } from 'react-router-dom'

import ProfilePicture from '../components/ProfilePicture'
import UserList from '../components/UserList'
import TweetCard from '../components/TweetCard'

import { Context } from '../context/token'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'

import '../styles/explore.css'
import FollowSuggestion from '../components/FollowSuggestion'

function Explore({ hideBar = false }) {
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])
    const { API, token } = useContext(Context)
    const history = useHistory()
    const {
        ref: refUsers,
        setVisible: setVisibleUsers,
        visible: visibleUsers
    } = useHideOnOutsideClick()

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

    function handleSearch(e) {
        if (e.which === 13) {
            setVisibleUsers(false)
            history.push(`/explore/${input}`)
        }
    }

    return (
        <div className='explore'>
            {
                !hideBar &&
                <>
                    <div className='explore__topbar'>
                        <div className='searchBar' ref={refUsers}>
                            <input
                                type='text'
                                placeholder='Buscar no Twitter'
                                className='searchBar__input'
                                value={input}
                                onChange={handleInput}
                                onClick={() => setVisibleUsers(true)}
                                onKeyPress={handleSearch}
                            />
                            <FontAwesomeIcon className='searchBar__icon' icon={faSearch} />

                        </div>

                    </div>
                    <div
                        className='explore__users'
                        style={{
                            transform: `scaleY(${visibleUsers ? 1 : 0})`
                        }}
                    >
                        {
                            input.length === 0 ?
                                <p className='explore__placeholder'>Tente buscar por pessoas, tópicos ou palavras-chave</p> :
                                users.map((user, i) => (
                                    <Link
                                        to={`/profile/${user.name}`}
                                        className='explore__userCard'
                                        key={i}
                                    >
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
                    <Route path='/explore/:id'>
                        <ExploreResults />
                    </Route>
                </>
            }
            <FollowSuggestion />
        </div>
    )
}

function ExploreResults() {
    const { id } = useParams()
    const { API } = useContext(Context)
    const [isFetched, setIsFetched] = useState(false)
    const [tab, setTab] = useState(0)
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    function wasIdUpdated() {
        const pattern = new RegExp(`\\b${id}\\b`, "ig")

        if (
            users.some(user => !user.name.match(pattern))
            || posts.some(post => !post.post.match(pattern))
        )
            return true

        return false
    }

    useEffect(() => {
        async function fetchResults() {
            const response = await fetch(`${API}/post/explore/${id}`)
            if (response.ok) {
                const data = await response.json()
                setUsers(data.users)
                setPosts(data.posts)
            }
        }

        if (wasIdUpdated())
            setIsFetched(false)

        if (!isFetched) {
            fetchResults()
            setIsFetched(false)
        }
    }, [isFetched, id, API]) //eslint-disable-line

    const MatchingTweets =
        <div className='results__tweetCard'>
            {posts.map(post => (
                <TweetCard
                    post={post}
                    setPosts={setPosts}
                    reloadAuthor={() => { }}
                />
            ))}
        </div>

    return (
        <div className='explore__results'>
            <nav className='defaultNavbar results__navbar'>
                <button
                    className={`defaultNavbar__item
                        ${tab === 0 ? 'defaultNavbar__item--selected' : ''}
                    `}
                    onClick={() => setTab(0)}
                >
                    Principais
                </button>
                <button
                    className={`defaultNavbar__item
                        ${tab === 1 ? 'defaultNavbar__item--selected' : ''}
                    `}
                    onClick={() => setTab(1)}
                >
                    Mais recentes
                </button>
                <button
                    className={`defaultNavbar__item
                        ${tab === 2 ? 'defaultNavbar__item--selected' : ''}
                    `}
                    onClick={() => setTab(2)}
                >
                    Pessoas
                </button>
                <button
                    className={`defaultNavbar__item
                        ${tab === 3 ? 'defaultNavbar__item--selected' : ''}
                    `}
                    onClick={() => setTab(3)}
                >
                    Fotos
                </button>
                <button
                    className={`defaultNavbar__item
                        ${tab === 4 ? 'defaultNavbar__item--selected' : ''}
                    `}
                    onClick={() => setTab(4)}
                >
                    Vídeos
                </button>
            </nav>
            <div className='explore__results__main'>
                {
                    tab === 0 ?
                        <>
                            {users.length !== 0 &&
                                <div className='results__users'>
                                    <h2 className='results__users__title'>Pessoas</h2>
                                    <div>
                                        <UserList list={users} />
                                    </div>
                                </div>
                            }
                            {MatchingTweets}
                        </> :
                        tab === 1 ?
                            <div>
                                {MatchingTweets}
                            </div> :
                            tab === 2 ?
                                <UserList list={users} /> :
                                tab === 3 ?
                                    <div>
                                    </div> :
                                    tab === 4 &&
                                    <div>
                                    </div>
                }
            </div>

        </div>
    )
}

export default Explore