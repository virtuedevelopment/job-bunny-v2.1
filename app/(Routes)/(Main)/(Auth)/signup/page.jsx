import React from "react";
import seo_config from "@/_data/seo";
import SignUpForm from "./SignUpForm";
import styles from "../auth.module.css";

export const metadata = {
  title: seo_config.signup.title,
  description: seo_config.signup.description,
  keywords: seo_config.signup.keywords,
  author: seo_config.signup.author,
};

export default function Signup() {
  return (
    <main className={styles.main}>
      <section className={styles.signup}>
        <div className={styles.image}></div>
        <SignUpForm />
      </section>
    </main>
  );
}
