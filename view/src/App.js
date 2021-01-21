import React, { useContext, useState } from 'react'

import { Switch, Route, Redirect, useLocation } from "react-router-dom"

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import MainSideBar from './components/MainSideBar'

import { Context } from './context/token'
import ToggleableSideBar from './components/ToggleableSideBar'
import useHideOnOutsideClick from './hooks/useHideOnOutsideClick'

function App() {
    const { token, switchColorTheme, switchBgTheme } = useContext(Context)
    const location = useLocation()

    const {
        ref: refTgSideBar,
        setVisible: setVisibleTgSideBar,
        visible: visibleTgSideBar
    } = useHideOnOutsideClick()

    return (
        <div className='app'>
            {!token && <Redirect to="/login" />}
            {!location.pathname.match(/(\/login|\/sign-up)/) &&
                <>
                    <MainSideBar
                        refTgSideBar={refTgSideBar}
                        setVisibleTgSideBar={setVisibleTgSideBar}
                        visibleTgSideBar={visibleTgSideBar}
                    />
                    <ToggleableSideBar
                        refTgSideBar={refTgSideBar}
                        setVisibleTgSideBar={setVisibleTgSideBar}
                        visibleTgSideBar={visibleTgSideBar}
                    />
                </>
            }
            <div className='app__main'>
                <Switch>

                    <Route path='/login'>
                        <Login />
                    </Route>

                    <Route path='/sign-up'>
                        <SignUp />
                    </Route>
                    <Route path='/aa'>
                    </Route>

                    <Route exact path='/'>
                        <Home setVisibleTgSideBar={setVisibleTgSideBar} />
                    </Route>


                </Switch>
            </div>
            <div className='app__trending' style={{ width: 400 }}>

            </div>
        </div >
    )
}

export default App