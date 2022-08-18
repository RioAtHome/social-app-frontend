import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import AuthVerify from './auth/auth-verify'
import auth from './auth/auth-helper'
import Home from './core/Home'

import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'



const MainRouter = () => {
  console.log("ROUTER");
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
       
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:username" component={EditProfile}/>
        <Route path="/user/:username" component={Profile}/>
      </Switch>
     <AuthVerify logOut={auth.clearJWT}/>
    </div>

    )
}

export default MainRouter
