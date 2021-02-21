import React from "react"
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register/register-page'
import ListPage from '../pages/list-page/list-page'
import AuthProvider from "../contexts/auth-context";
import ProtectedRoute from "./protected-route/protected-route";
import ProtectedLogged from "./protected-logged/protected-logged";
import LoginPage from "../pages/login/login-page";
import ListsProvider from "../contexts/lists-context";
import { Redirect } from 'react-router-dom';

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Switch>
                <ProtectedLogged Route path="/register" component={RegisterPage} />
                <ProtectedLogged Route path="/login" component={LoginPage} />
                <Route exact path="/">
                    <Redirect to="/login"></Redirect>
                </Route>
                <ListsProvider>
                    <ProtectedRoute path="/lists" component={ListPage} />
                </ListsProvider>
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
