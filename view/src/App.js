import React, { useContext } from 'react'

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
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import {
    faBell as farBell,
    faEnvelope as farEnvelope,
    faUser as farUser
} from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import './styles/app.css'
import './styles/hover.css'

function App() {
    const { token } = useContext(Context)

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
                        </ul>
                    </nav>

                </div>}


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