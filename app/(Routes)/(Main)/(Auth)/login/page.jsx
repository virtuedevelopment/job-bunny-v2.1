import React from "react";
import seo_config from "@/_data/seo";
import styles from "../auth.module.css";
import LoginForm from "./LoginForm";

export const metadata = {
  title: seo_config.login.title,
  description: seo_config.login.description,
  keywords: seo_config.login.keywords,
  author: seo_config.login.author,
};

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
