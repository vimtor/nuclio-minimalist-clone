import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register-page'
import ListPage from '../pages/list-page'
import AuthProvider from "../contexts/auth-context";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/lists" component={ListPage} />
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
