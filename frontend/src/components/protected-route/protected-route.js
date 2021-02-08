import {Route, Redirect} from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {logged} = useAuth();
    return (
        <Route
            {...rest}
            render={props => {
                if (logged) {
                    return <Component {...props} />
                }
                return <Redirect to="/register" />
            }}
        />
    )
}

export default ProtectedRoute;
