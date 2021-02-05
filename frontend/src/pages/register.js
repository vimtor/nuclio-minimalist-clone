import Input from "../components/input/input";

const RegisterPage = () => {
  return (
      <main>
          <h1>Register</h1>
          <form>
              <Input label="Email" type="email" name="email" />
              <Input label="Password" type="password" name="password" />
              <button>Register</button>
          </form>
      </main>
  )
}

export default RegisterPage
