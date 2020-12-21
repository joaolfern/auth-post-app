import React, { useState } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    const [token, setToken] = useState('')

    const API = "http://localhost:1234/api"

    return (
        <Context.Provider value={({ token, setToken, API })}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }