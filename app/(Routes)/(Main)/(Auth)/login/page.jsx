import React from "react";
import styles from "../auth.module.css";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.login}>
        <LoginForm />
        <div className={styles.image}></div>
      </section>
    </main>
  );
}
