import React, { useState, useEffect } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState({ following: [], followers: [] })
    const [isFetched, setIsFetched] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState(JSON.parse(localStorage.getItem('theme'))
        || { color: 0, bg: 0 })
    const [themeLoaded, setThemeLoaded] = useState(false)

    console.log(localStorage.getItem('theme'), selectedTheme)

    useEffect(() => {
        if (token && !localStorage.getItem('token')) {
            logIn()
        }
        if (!themeLoaded) {
            switchBgTheme()
            switchColorTheme()
            setThemeLoaded(true)
        }
    }, [token, themeLoaded])

    function logIn() {
        localStorage.setItem('token', token)
        setIsFetched(false)
    }

    function logOff() {
        localStorage.removeItem('token')
        setToken('')
        setUser({ following: [], followers: [] })
    }

    const colorThemes = [
        [203, 89, 53, 1],
        [38, 100, 56, 1],
        [341, 75, 51, 1],
        [263, 51, 53, 1],
        [17, 91, 55, 1],
        [141, 73, 42, 1],
    ]

    const bgThemes = [
        { primary: [0, 100, 100, 1], secondary: [257, 41, 97, 1], txt: '#000000', border: '#f5f3fa' },
        { primary: [210, 34, 13, 1], txt: '#ffffff', border: '#38444d' },
        { primary: [0, 0, 0, 1], txt: '#ffffff', border: '#2f3336' },
    ]

    function getHsla(values, modifier = 0, lighter = false) {
        return `hsla(${values[0]}, ${values[1]}%, ${values[2] + (modifier < 0 || lighter ? modifier : 0)}%, ${modifier > 0 && !lighter ? `0.${modifier}` : values[3]})`
    }

    function switchColorTheme(option = selectedTheme.color) {
        document.documentElement.style.setProperty('--main-color', getHsla(colorThemes[option]))
        document.documentElement.style.setProperty('--light-main-color', getHsla(colorThemes[option], 22))
        document.documentElement.style.setProperty('--dark-main-color', getHsla(colorThemes[option], -10))

        setSelectedTheme(prev => ({ ...prev, color: option }))
        localStorage.setItem('theme', JSON.stringify({ bg: selectedTheme.bg, color: option }))

    }

    function switchBgTheme(option = selectedTheme.bg) {
        document.documentElement.style.setProperty('--bg-color', getHsla(bgThemes[option].primary))
        document.documentElement.style.setProperty('--txt-color', bgThemes[option].txt)
        document.documentElement.style.setProperty('--border-color', bgThemes[option].border)


        if (bgThemes[option].secondary) {
            document.documentElement.style.setProperty('--secondary-bg-color',
                getHsla(bgThemes[option].secondary)
            )
            document.documentElement.style.setProperty('--logo', '#1da0f2')
        }

        else {
            document.documentElement.style.setProperty('--secondary-bg-color',
                getHsla(bgThemes[option].primary, 5, true)
            )
            document.documentElement.style.setProperty('--logo', '#ffffff')
        }
        localStorage.setItem('theme', JSON.stringify({ color: selectedTheme.color, bg: option }))

        setSelectedTheme(prev => ({ ...prev, bg: option }))
    }


    const API = "http://localhost:1234/api"

    const parseMessage = {
        ['"display_name" is not allowed to be empty']: 'Name is required',
        ['"email" is not allowed to be empty']: 'Email is required',
        ['"email" must be a valid email']: 'Invalid email',
        ['"password" is not allowed to be empty']: 'Password is required',
        ['"password" length must be at least 8 characters long']: 'Password must be at least 8 characters long'// eslint-disable-line 
    }

    return (
        <Context.Provider value={({
            token,
            setToken,
            API,
            parseMessage,
            logOff,
            user,
            setUser,
            isFetched,
            setIsFetched,
            switchColorTheme,
            switchBgTheme,
            getHsla,
            colorThemes,
            bgThemes,
            selectedTheme,
            setSelectedTheme
        })}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }