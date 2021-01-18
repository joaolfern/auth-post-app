import { faTimes, faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import ShadedBox from './ShadedBox'

import '../styles/toggleableSideBar.css'
import ProfilePicture from './ProfilePicture'

import { Context } from '../context/token'

function ToggleableSideBar({ visibleTgSideBar, setVisibleTgSideBar, refTgSideBar }) {
    const { user, logOff } = useContext(Context)

    const menuItens = [
        {
            icon: faUser,
            label: 'Perfil'
        },
        {
            icon: faCog,
            label: 'Configurações e privacidade'
        },
        {
            label: 'Sair',
            class: 'toggleableSideBar__buttons__item--sair',
            action: logOff
        }
    ]

    return (
        <div className='toggleableSideBar--wrapper'>
            <ShadedBox condition={visibleTgSideBar}>
            </ShadedBox>
            <div
                className='toggleableSideBar' ref={refTgSideBar}
                style={{
                    transform: `translateX(${visibleTgSideBar ? '0' : '-100%'})`,
                    transition: 'transform .2s ease-in-out'
                }}
            >
                <header className='toggleableSideBar__header'>
                    <h1 className='toggleableSideBar__title'>Informações da conta</h1>
                    <button
                        className='app__tweetar__close'
                        onClick={() => setVisibleTgSideBar(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </header>
                <div className='toggleableSideBar__profile'>
                    <div className='toggleableSideBar__picture'>
                        <ProfilePicture url={user.photo} />
                    </div>
                    <div className='toggleableSideBar__id'>
                        <h3 className='displayName'>{user['display_name']}</h3>
                        <h4 className='username'>@{user.name}</h4>
                    </div>
                    <div className='toggleableSideBar__followingStatus'>
                        <p>
                            <span className='followingStatus__number'>{user.following.length} </span>
                            Seguindo
                        </p>
                        <p>
                            <span className='followingStatus__number'>{user.followers.length} </span>
                            Seguidores
                        </p>
                    </div>
                </div>
                <div className='toggleableSideBar__buttons'>
                    {menuItens.map(item => (
                        <button
                            className={`toggleableSideBar__buttons__item
                                ${item.class ? item.class : ''}`
                            }
                            onClick={item.action ? item.action : () => { }}
                        >

                            {item.icon &&
                                <FontAwesomeIcon className='toggleableSideBar__icon' icon={item.icon} />
                            }
                            <p>{item.label}</p>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ToggleableSideBar