import React, { useContext } from 'react'

import { Switch, Route } from "react-router-dom"
import Home from './pages/Home'

import { Context } from './context/token'
import Login from './pages/Login'

function App() {
    const { token } = useContext(Context)

    return (
        <div className="app">
            <Switch>
                {
                    !token &&
                    <Route path="/">
                        <Login />
                    </Route>
                }
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}

export default App