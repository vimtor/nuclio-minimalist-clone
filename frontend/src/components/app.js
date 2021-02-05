import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register'
import AuthProvider from "../contexts/auth-context";

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Switch>
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </AuthProvider>
    </BrowserRouter>
);

export default App;
