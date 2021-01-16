import React, { useContext } from 'react'

import { Switch, Route, Redirect } from "react-router-dom"

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SideBar from './components/SideBar'

import { Context } from './context/token'

function App() {
    const { token } = useContext(Context)

    return (
        <div className='app'>
            {!token ? <Redirect to="/login" /> : <Redirect to='/' />}

            <Switch>

                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/sign-up'>
                    <SignUp />
                </Route>

                <Route exact path="/">
                    <SideBar />
                    <Home />
                </Route>

            </Switch>
        </div >
    )
}

export default App