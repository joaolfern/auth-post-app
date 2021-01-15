import React, { useState, useEffect } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState({ photo: '' })
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (token && !localStorage.getItem('token')) {
            logIn()
        }
    }, [token])

    function logIn() {
        localStorage.setItem('token', token)
    }

    function logOff() {
        localStorage.removeItem('token')
        setToken('')
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
            setIsFetched
        })}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }