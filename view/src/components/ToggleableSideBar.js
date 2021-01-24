import { faTimes, faUser, faCog, faBrush, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'


import '../styles/toggleableSideBar.css'
import ProfilePicture from './ProfilePicture'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'
import ShadedBox from './ShadedBox'
import formatNumber from '../functions/formatNumber'

import { Context } from '../context/token'
import { useHistory } from 'react-router-dom'

function ToggleableSideBar({ visibleTgSideBar, setVisibleTgSideBar, refTgSideBar }) {
    const history = useHistory()

    const { user,
        logOff,
        getHsla,
        colorThemes,
        bgThemes,
        switchColorTheme,
        switchBgTheme,
        selectedTheme,
        setSelectedTheme
    } = useContext(Context)

    const {
        ref: refThemes,
        visible: visibleThemes,
        setVisible: setVisibleThemes
    } = useHideOnOutsideClick()

    const menuItens = [
        {
            icon: faUser,
            label: 'Perfil',
            action: () => {
                history.push(`/profile/${user.name}`)
            }
        },
        {
            icon: faCog,
            label: 'Configurações e privacidade'
        },
        {
            icon: faBrush,
            label: 'Tela',
            action: () => setVisibleThemes(true)
        },
        {
            label: 'Sair',
            class: 'toggleableSideBar__buttons__item--sair',
            action: logOff
        }
    ]

    const colorItens = [
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/1f499.svg', color: colorThemes[0] },
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/2b50.svg', color: colorThemes[1] },
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/1f338.svg', color: colorThemes[2] },
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/1f419.svg', color: colorThemes[3] },
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/1f525.svg', color: colorThemes[4] },
        { icon: 'https://abs-0.twimg.com/emoji/v2/svg/1f951.svg', color: colorThemes[5] }
    ]

    const bgItens = [
        { label: 'Padrão', color: bgThemes[0] },
        { label: 'Um pouco escuro', color: bgThemes[1] },
        { label: 'Superescuro', color: bgThemes[2] }
    ]

    return (
        <div className='toggleableSideBar--wrapper'>
            <ShadedBox condition={visibleTgSideBar}>
            </ShadedBox>
            <div
                className='toggleableSideBar' ref={refTgSideBar}
                style={{
                    transform: `translateX(${visibleTgSideBar ? '0' : '-125%'})`,
                    transition: 'transform .2s ease-in-out'
                }}
            >
                <header className='toggleableSideBar__header'>
                    <h1 className='toggleableSideBar__title'>Informações da conta</h1>
                    <button
                        className='app__tweetar__close navHeader__icon'
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
                    <div className='followingStatus'>
                        <p>
                            <span className='followingStatus__number'>{formatNumber(user.following.length)} </span>
                            Seguindo
                        </p>
                        <p>
                            <span className='followingStatus__number'>{formatNumber(user.followers.length)} </span>
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
                            key={item.label}
                            onClick={() => {
                                if (item.action) {
                                    item.action()
                                    setVisibleTgSideBar(false)
                                }
                            }}
                        >
                            {item.icon &&
                                <FontAwesomeIcon className='toggleableSideBar__icon' icon={item.icon} />
                            }
                            <p>{item.label}</p>
                        </button>
                    ))}
                </div>
            </div>
            <ShadedBox condition={visibleThemes}>
                <div className='themes' ref={refThemes}>
                    <div className='themes__header' >
                        <FontAwesomeIcon
                            className='themes__close' icon={faTimes}
                            onClick={() => setVisibleThemes(false)}
                        />
                        <h1 className='themes__title'>Personalizar sua exibição</h1>
                    </div>
                    <div className='themes--wrapper'>
                        <p className='themes__label'>Color</p>
                        <div className='themes__color themes__box'>
                            {colorItens.map((item, i) => (
                                <div className='themes__color__item' key={item.color}>
                                    <button
                                        className='color__item__button'
                                        style={{ background: getHsla(item.color) }}
                                        onClick={() => switchColorTheme(i)}
                                    >
                                        {selectedTheme.color === i &&
                                            <FontAwesomeIcon className='color__item__checked' icon={faCheck} />
                                        }
                                    </button>
                                    <img className='color__item__icon' src={item.icon} />

                                </div>
                            ))}
                        </div>
                        <p className='themes__label'>Plano de fundo</p>
                        <div className='themes__box themes__bg'>
                            {
                                bgItens.map((item, i) => (
                                    <div className='themes__bg__item'
                                        key={i}
                                        style={{
                                            background: getHsla(item.color.primary),
                                            color: item.color.txt,
                                            border: selectedTheme.bg === i ?
                                                `solid ${getHsla(colorThemes[selectedTheme.color])} 4px`
                                                : 'none'
                                        }}
                                        onClick={() => setSelectedTheme(() => switchBgTheme(i))}
                                    >
                                        <input
                                            className='bg__item__icon'
                                            type='radio'
                                            checked={selectedTheme.bg === i}
                                            onClick={() => { }}
                                        />
                                        <label className='bg__item__label'> {item.label}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button
                        className='blueButton themes__button'
                        onClick={() => setVisibleThemes(false)}
                    >
                        Concluído
                    </button>
                </div>
            </ShadedBox>
        </div>
    )
}

export default ToggleableSideBar