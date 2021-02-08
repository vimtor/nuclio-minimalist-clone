import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register-page'
import ListPage from '../pages/list-page/list-page'
import AuthProvider from "../contexts/auth-context";
import ProtectedRoute from "./protected-route/protected-route";
import LoginPage from "../pages/login-page";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <ProtectedRoute path="/lists" component={ListPage} />
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
