import Input from "../components/input/input";
import useAuth from "../hooks/use-auth";
import {useHistory} from "react-router-dom";

const LoginPage = () => {
    const history = useHistory()
    const {login, loginWithGoogle, loading} = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const email = data.get('email')
        const password = data.get('password')

        await login({email, password})
        history.push("/lists")
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" name="email"/>
                <Input label="Password" type="password" name="password"/>
                <button type="submit" disabled={loading}>Login</button>
            </form>
            <hr/>
            <button onClick={loginWithGoogle}>Continue with Google</button>
        </main>
    )
}

export default LoginPage
