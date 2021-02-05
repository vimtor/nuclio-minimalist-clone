import {useState} from 'react'
import Input from "../components/input/input";
import {register} from "../helpers/auth";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
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
            setLoading(true)
            try {
                const {data} = await register({email, password})
                console.log(data.token)
            }
            catch (error) {
                setError(error)
            }
            setLoading(false)
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
