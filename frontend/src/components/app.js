import {Route, Switch, BrowserRouter} from 'react-router-dom'
import RegisterPage from '../pages/register'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/register" component={RegisterPage} />
        </Switch>
    </BrowserRouter>
);

export default App;
