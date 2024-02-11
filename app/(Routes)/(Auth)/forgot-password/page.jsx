import React from "react";
import styles from "../auth.module.css";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <main className={styles.main}>
      <section className={styles.forgotP}>
        <ForgotPasswordForm />
        <div className={styles.image}></div>
      </section>
    </main>
  );
}
