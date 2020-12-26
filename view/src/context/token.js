import React, { useState } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [token, setToken] = useState('')
    const API = "http://localhost:1234/api"

    const convertMessage = {
        ['"display_name" is not allowed to be empty']: 'Name is required',// eslint-disable-line 
        ['"email" is not allowed to be empty']: 'Email is required',// eslint-disable-line 
        ['"email" must be a valid email']: 'Invalid email',// eslint-disable-line 
        ['"password" is not allowed to be empty']: 'Password is required', // eslint-disable-line 
        ['"password" length must be at least 8 characters long']: 'Password must be at least 8 characters long'// eslint-disable-line 
    }

    return (
        <Context.Provider value={({ token, setToken, API, convertMessage })}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }