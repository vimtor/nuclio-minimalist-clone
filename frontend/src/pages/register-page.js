import {useState} from 'react'
import Input from "../components/input/input";
import useAuth from "../hooks/use-auth";

const RegisterPage = () => {
    const {register, loading} = useAuth()
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        setError('')

        event.preventDefault()
        const data = new FormData(event.target)
        const email = data.get('email')
        const password = data.get('password')
        const confirmPassword = data.get('confirm-password')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
        }
        else {
            try {
                await register({email, password})
            }
            catch (error) {
                setError('Something went wrong')
            }
        }
    }

    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" name="email"/>
                <Input label="Password" type="password" name="password"/>
                <Input label="Confirm password" type="password" name="confirm-password"/>
                <button type="submit" disabled={loading}>Register</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </main>
    )
}

export default RegisterPage
