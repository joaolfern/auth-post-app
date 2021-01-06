import React, { useContext } from 'react'

import { Switch, Route, Redirect } from "react-router-dom"
import Home from './pages/Home'

import { Context } from './context/token'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
    const { token } = useContext(Context)

    return (
        <div className="app">

            {!token ? <Redirect to="/login" /> : <Redirect to='/' />}

            <Switch>

                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/sign-up'>
                    <SignUp />
                </Route>

                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}

export default App