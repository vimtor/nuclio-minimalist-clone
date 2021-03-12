import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input/input";
import useAuth from "../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import styles from "./register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = () => {
  const history = useHistory();
  const { register, loading } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    setError("");

    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        await register({ email, password });
        history.push("/lists");
      } catch (error) {
        setError(error.message);
      }
    }
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
          <h1>Register</h1>
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
            <Input
              className={styles.inputs}
              label="Confirm password"
              type="password"
              name="confirm-password"
            />
            <div className={styles.buttonContainer}>
              <button type="submit" disabled={loading}>
                Register
              </button>
              <div className={styles.loginContainer}>
                <h4>Are you already register?</h4>
                <Link to="/login">
                  <button className={styles.login} disabled={loading}>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
