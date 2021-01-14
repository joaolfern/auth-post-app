import React, { useContext, useState } from 'react'

import { Switch, Route, Redirect } from "react-router-dom"

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

function App() {
    const { token } = useContext(Context)
    const [showTweetar, setShowTweetar] = useState(false)

    const navbarItens = [
        {
            icon: faTwitter,
            label: '',
            class: 'navbar__item--twitter'
        },
        {
            icon: faHome,
            label: 'Página Inicial'
        },
        {
            icon: faHashtag,
            label: 'Explorar'
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
        },
        {
            icon: faSearch,
            label: 'Pesquisar',
            class: 'navbar__item--search'
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
                                <li className={`navbar__item ${item.class ? item.class : ''}`
                                }>
                                    <div className='navbar__item__icon'>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    {item.label && <p className='navbar__item__label'>{item.label}</p>}
                                </li>
                            ))}
                            <li>
                                <button
                                    className='blueButton navlist__tweetarBtn'
                                    onClick={() => setShowTweetar(true)}
                                >
                                    Tweetar
                                </button>
                            </li>
                            <li>
                                <button
                                    className='blueButton navlist__tweetarBtn--small'
                                    onClick={() => setShowTweetar(true)}
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


                    </nav>
                </div>}

            <div className='app__tweetar' style={{ display: showTweetar ? 'unset' : 'none' }}>
                <div className='app__tweetar__header'>
                    <button
                        className='app__tweetar__close'
                        onClick={() => setShowTweetar(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className='app__tweetar__main'>
                    <Tweetar customClass={{ input: 'app' }} />
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
        </div>
    )
}

export default App