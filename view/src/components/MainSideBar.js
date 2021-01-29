import React, { useContext } from 'react'
import { useHistory, useLocation } from "react-router-dom"

import { Context } from '../context/token'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faHashtag,
    faUser,
    faSearch,
    faTimes,
    faFeatherAlt,
    faPlus,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import {
    faBell as farBell,
    faEnvelope as farEnvelope,
    faUser as farUser
} from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import '../styles/app.css'
import '../styles/hover.css'
import Tweetar from './Tweetar'
import ProfilePicture from './ProfilePicture'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'
import ShadedBox from './ShadedBox'

function MainmainSideBar({ setVisibleTgSideBar }) {
    const { user, logOff } = useContext(Context)
    const location = useLocation()
    const history = useHistory()

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
            path: '/',
            action: () => { history.push(`/`) }
        },
        {
            icon: faHashtag,
            label: 'Explorar',
            class: 'navbar__item--hashtag',
            path: new RegExp('/explore', 'i'),
            action: () => { history.push('/explore') }
        },

        {
            icon: faSearch,
            label: 'Pesquisar',
            class: 'navbar__item--search',
            path: new RegExp('/explore', 'i'),
            action: () => { history.push('/explore') }
        },
        {
            icon: farBell,
            label: 'Notificações',
            path: new RegExp('/notifications', 'i'),
        },
        {
            icon: farEnvelope,
            label: 'Mensagens',
            path: new RegExp('/messages', 'i'),
        },
        {
            icon: location.pathname === `/profile/${user.name}` ? faUser : farUser,
            label: 'Perfil',
            class: 'navbar__item--profile',
            path: new RegExp(`/profile/${user.name}`, 'i'),
            action: () => { history.push(`/profile/${user.name}`) }
        }, {
            icon: faEllipsisH,
            label: 'Mais',
            class: 'navbar__item--more',
            action: () => setVisibleTgSideBar(true),
            path: null
        },
    ]

    return (
        <>
            <div className='app__mainSideBar'>
                <nav className='navbar'>
                    <ul className='navbar__list'>
                        {navbarItens.map(item => (
                            <li className={`navbar__item
                                    ${item.class ? item.class : ''}
                                    ${(
                                    item.path === '/' ?
                                        item.path === location.pathname :
                                        location.pathname.match(item.path)
                                ) ?
                                    'selectedIcon' : ''}
                                    `}
                                key={item.label}
                                onClick={item.action}
                            >
                                <div className={`navbar__item__icon`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                {item.label &&
                                    <p className='navbar__item__label'>{item.label}</p>
                                }
                            </li>
                        ))}
                        <li className='navlist__tweetarBtn--circular--mainSideBar'>
                            <button
                                className='blueButton navlist__tweetarBtn--circular--mainSideBar navlist__tweetarBtn--circular'
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
                    >
                        Tweetar
                        </button>
                </nav>

                <div className='mainSideBar__profileCard__wrapper' ref={refProfileDetails}>
                    <div
                        className='mainSideBar__profileCard--min mainSideBar__profileCard'
                        onClick={() => setVisibleProfileDetails(prev => !prev)}
                    >
                        <div className='profileCard__photo'>
                            <ProfilePicture url={user.photo} />
                        </div>
                        <div className='profileCard__id profileCard__id--mediaQuerry'>
                            <h3 className='displayName'>{user['display_name']}</h3>
                            <h4 className='username'>@{user.name}</h4>
                        </div>
                        <FontAwesomeIcon className='tweet__showOptions profileCard__id--mediaQuerry' icon={faEllipsisH} />
                    </div>
                    <div

                        className='profileCard__details'
                        style={{
                            transform: `scale(${visibleProfileDetails ? '1' : '0'})`
                        }}
                    >
                        <div className='mainSideBar__profileCard profileCard__details__header'>
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
            </div>

            <ShadedBox condition={visibleTweetar}>
                <div
                    className='app__tweetar' ref={refTweetar}
                    style={{ display: visibleTweetar ? 'unset' : 'none' }}
                >
                    <div className='app__tweetar__header navHeader'>
                        <button
                            className='app__tweetar__close navHeader__icon'
                            onClick={() => setVisibleTweetar(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className='app__tweetar__main'>
                        <Tweetar
                            setVisible={setVisibleTweetar}
                            customClass={{ input: 'app', button: 'app' }}
                        />
                    </div>
                </div>
            </ShadedBox>

            <button
                className='blueButton navlist__tweetarBtn--circular navlist__tweetarBtn--circular--absolute'
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

        </>

    )
}

export default MainmainSideBar