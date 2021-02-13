import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register-page'
import ListPage from '../pages/list-page/list-page'
import AuthProvider from "../contexts/auth-context";
import ProtectedRoute from "./protected-route/protected-route";
import LoginPage from "../pages/login-page";
import ListsProvider from "../contexts/lists-context";

const App = () => (
    <BrowserRouter>
        <AuthProvider>

            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <ListsProvider>
                    <ProtectedRoute path="/lists" component={ListPage} />
                </ListsProvider>
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
