import { faTimes, faUser, faCog, faBrush } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import ShadedBox from './ShadedBox'

import '../styles/toggleableSideBar.css'
import ProfilePicture from './ProfilePicture'
import useHideOnOutsideClick from '../hooks/useHideOnOutsideClick'

import { Context } from '../context/token'

function ToggleableSideBar({ visibleTgSideBar, setVisibleTgSideBar, refTgSideBar }) {
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
            label: 'Perfil'
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
                            key={item.label}
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
            <ShadedBox condition={visibleThemes}>
                <div className='themes' ref={refThemes}>
                    <div className='themes--wrapper'>
                        <h1 className='themes__title'>Personalizar sua exibição</h1>
                        <p className='themes__label'>Color</p>
                        <div className='themes__color themes__box'>
                            {colorItens.map((item, i) => (
                                <div className='themes__color__item' key={item.color}>
                                    <button
                                        className='color__item__button'
                                        style={{ background: getHsla(item.color) }}
                                        onClick={() => switchColorTheme(i)}
                                    />
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
                                        <input type='radio' checked={selectedTheme.bg === i} />
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