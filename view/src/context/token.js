import React, { useState, useEffect } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { following: [], followers: [] })
    const [posts, setPosts] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState(JSON.parse(localStorage.getItem('theme'))
        || { color: 0, bg: 0 })
    const [themeLoaded, setThemeLoaded] = useState(false)
    const [reloadUser, setReloadUser] = useState(false)

    async function getUser() {
        const response = await fetch(`${API}/user/profile`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        let data = await response.json()

        if (response.ok) {
            setUser(data)
            return data
        }
    }

    async function fetchPosts(url, setter) {
        const response = await fetch(`${API}/${url}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })


        if (response.ok) {
            let data = await response.json()
            setter(data.results)

        }
    }

    useEffect(() => {
        if ((token && (!localStorage.getItem('token') || !localStorage.getItem('user'))) || reloadUser) {
            logIn()
            setReloadUser(false)
        }

        if (!isFetched) {
            fetchPosts(`post`, setPosts)
            setIsFetched(true)
        }

        if (!themeLoaded) {
            switchBgTheme()
            switchColorTheme()
            setThemeLoaded(true)
        }
    }, [token, themeLoaded, reloadUser, isFetched])// eslint-disable-line 

    async function logIn() {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(await getUser()))
        setIsFetched(false)
    }

    function logOff() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
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
        { primary: [210, 34, 13, 1], secondary: [208.9, 35.1, 15.1, 1], txt: '#ffffff', border: '#38444d' },
        { primary: [0, 0, 0, 1], secondary: [214.3, 14.3, 9.6, 1], txt: '#ffffff', border: '#2f3336' },
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

        localStorage.setItem('theme', JSON.stringify({ color: selectedTheme.color, bg: option }))

        setSelectedTheme(prev => ({ ...prev, bg: option }))
    }

    const API = `${process.env.REACT_APP_API}/api`

    const parseMessage = {
        ['"display_name" is not allowed to be empty']: 'Name is required',// eslint-disable-line 
        ['"email" is not allowed to be empty']: 'Email is required',// eslint-disable-line 
        ['"email" must be a valid email']: 'Invalid email',// eslint-disable-line 
        ['"password" is not allowed to be empty']: 'Password is required', // eslint-disable-line 
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
            setSelectedTheme,
            fetchPosts,
            posts,
            setPosts,
            setReloadUser
        })}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }