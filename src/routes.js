import React from "react";
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
import Feed from "./screens/feed.screen/feed";
import New from "./screens/new.screen/new";
import Login from "./screens/auth.screen/login";
import Register from "./screens/auth.screen/register";

export default ()=>{
    return (
        <BrowserRouter>
        <Switch>
            <Route
                path="/"
                component={Login}
                exact
            />
            <Route
                path="/register"
                component={Register}
                exact
            />
            <Route
                path="/feed"
                component={Feed}
                exact
            />
            <Route
                path="/new"
                component={New}
                exact
            />
            <Redirect
                from="*"
                to="/" 
            />
        </Switch>
        </BrowserRouter>
    )
}