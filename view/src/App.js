import React, { useContext, useRef, useState } from 'react'

import { Switch, Route, Redirect, useLocation } from "react-router-dom"

import { Context } from './context/token'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faBell,
    faHashtag,
    faEnvelope,
    faUser,
    faSearch,
    faTimes,
    faFeatherAlt,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import {
    faBell as farBell,
    faEnvelope as farEnvelope,
    faUser as farUser
} from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import './styles/app.css'
import './styles/hover.css'
import Tweetar from './components/Tweetar'
import ProfilePicture from './components/ProfilePicture'
import useHideOnOutsideClick from './hooks/useHideOnOutsideClick'

function App() {
    const { token, user, logOff } = useContext(Context)
    const location = useLocation()

    const {
        ref: refTweetar,
        visible: visibleTweetar,
        setVisible: setVisibleTweetar
    } = useHideOnOutsideClick()

    const {
        ref: refProfileDetails,
        visible: visibleProfileDetails,
        setVisible: setVisibleProfileDetails
    } = useHideOnOutsideClick()

    const navbarItens = [
        {
            icon: faTwitter,
            label: '',
            class: 'navbar__item--twitter',
        },
        {
            icon: faHome,
            label: 'Página Inicial',
            path: '/'
        },
        {
            icon: faHashtag,
            label: 'Explorar',
            class: 'navbar__item--hashtag'
        },

        {
            icon: faSearch,
            label: 'Pesquisar',
            class: 'navbar__item--search'
        },
        {
            icon: farBell,
            label: 'Notificações'
        },
        {
            icon: farEnvelope,
            label: 'Mensagens'
        },
        {
            icon: farUser,
            label: 'Perfil'
        }
    ]

    return (
        <div className="app">

            {!token ? <Redirect to="/login" /> : <Redirect to='/' />}

            {token &&
                <div className='app__sideBar'>
                    <nav className='navbar'>
                        <ul className='navbar__list'>
                            {navbarItens.map(item => (
                                <li className={`navbar__item 
                                    ${item.class ? item.class : ''}
                                    ${item.path === location.pathname ? 'selectedIcon' : ''}
                                    `}
                                >
                                    <div className={`navbar__item__icon`}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    {item.label &&
                                        <p className='navbar__item__label'>{item.label}</p>
                                    }
                                </li>
                            ))}
                            <li>
                                <button
                                    className='blueButton navlist__tweetarBtn--small'
                                    onClick={() => setVisibleTweetar(true)}
                                >
                                    <div >
                                        <FontAwesomeIcon
                                            className='tweetarBtn__icon1'
                                            icon={faFeatherAlt}
                                        />
                                        <FontAwesomeIcon
                                            className='tweetarBtn__icon2'
                                            icon={faPlus}
                                        />
                                    </div>
                                </button>
                            </li>
                        </ul>
                        <button
                            className='blueButton navlist__tweetarBtn'
                            onClick={() => setVisibleTweetar(true)}
                            name='oi'
                        >
                            Tweetar
                        </button>

                    </nav>

                    <div className='sidebar__profileCard__wrapper'>
                        <div className='sidebar__profileCard' onClick={() => setVisibleProfileDetails(true)}>
                            <div className='profileCard__photo'>
                                <ProfilePicture url={user.photo} />
                            </div>
                            <div className='profileCard__id profileCard__id--mediaQuerry'>
                                <h3 className='displayName'>{user['display_name']}</h3>
                                <h4 className='username'>@{user.name}</h4>
                            </div>
                        </div>
                        <div
                            ref={refProfileDetails}
                            className='profileCard__details'
                            style={{
                                transform: `scale(${visibleProfileDetails ? '1' : '0'})`
                            }}
                        >
                            <div className='sidebar__profileCard profileCard__details__header'>
                                <div className='profileCard__photo'>
                                    <ProfilePicture url={user.photo} />
                                </div>
                                <div className='profileCard__id'>
                                    <h3 className='displayName'>{user['display_name']}</h3>
                                    <h4 className='username'>@{user.name}</h4>
                                </div>
                            </div>
                            <p onClick={logOff} className='profileCard__details__logOff'>
                                Sair de @{user.name}
                            </p>
                        </div>

                    </div>
                </div>}

            <div
                className='app__tweetar__wrapper'
                style={{
                    transform: `scale(${visibleTweetar ? '1' : '0'})`,
                    opacity: visibleTweetar ? '1' : '0',
                    transition: visibleTweetar ? 'opacity .2s' : 'none'
                }}
            >
                <div
                    className='app__tweetar' ref={refTweetar}
                    style={{ display: visibleTweetar ? 'unset' : 'none' }}
                >
                    <div className='app__tweetar__header'>
                        <button
                            className='app__tweetar__close'
                            onClick={() => setVisibleTweetar(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className='app__tweetar__main'>
                        <Tweetar customClass={{ input: 'app' }} />
                    </div>
                </div>
            </div>



            <Switch>

                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/sign-up'>
                    <SignUp />
                </Route>

                <Route exact path="/">
                    <Home />
                </Route>

            </Switch>
        </div >
    )
}

export default App