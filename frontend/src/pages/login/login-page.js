import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import useAuth from "../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const history = useHistory();
  const { login, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    await login({ email, password });
    history.push("/lists");
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p>Welcome to Nuclio Minimalist Clone project!</p>
      </header>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faCheckSquare} />{" "}
          </span>
          <h3>Minimalist Clone</h3>
          <h1>Login</h1>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <Input
              className={styles.inputs}
              label="Email"
              type="email"
              name="email"
            />
            <Input
              className={styles.inputs}
              label="Password"
              type="password"
              name="password"
            />
            <div className={styles.buttonContainer}>
              <button type="submit" disabled={loading}>
                Login
              </button>
              <div className={styles.registerContainer}>
                <h4>Are you not registered?</h4>
                <Link to="/register">
                  <button className={styles.register} disabled={loading}>
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
