import React, { useContext } from 'react'

import { Switch, Route, Redirect, useLocation } from "react-router-dom"

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import MainSideBar from './components/MainSideBar'
import Explore from './pages/Explore'

import { Context } from './context/token'
import ToggleableSideBar from './components/ToggleableSideBar'
import useHideOnOutsideClick from './hooks/useHideOnOutsideClick'
import Profile from './pages/Profile'
import { Helmet } from 'react-helmet'
import TweetDetails from './components/TweetDetails'

function App() {
    const { token } = useContext(Context)
    const location = useLocation()

    const {
        ref: refTgSideBar,
        setVisible: setVisibleTgSideBar,
        visible: visibleTgSideBar
    } = useHideOnOutsideClick()

    return (
        <div className='app'>
            <Helmet>
                <title>Twitter</title>
            </Helmet>
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

                    <Route path='/profile/:name'>
                        <Profile />
                    </Route>

                    <Route path='/explore'>
                        <Explore />
                    </Route>

                    <Route path='/status/:id'>
                        <TweetDetails />
                    </Route>
                </Switch>
            </div>
            {!location.pathname.match(/(\/login|\/sign-up)/) &&
                <div className='app__explore' >
                    <Explore hideBar={location.pathname.match(/\/explore/)} />
                </div>
            }

        </div >
    )
}

export default App