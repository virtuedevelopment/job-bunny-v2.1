import React from "react";
import seo_config from "@/_data/seo";
import styles from "../auth.module.css";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: seo_config.forgotPassword.title,
  description: seo_config.forgotPassword.description,
  keywords: seo_config.forgotPassword.keywords,
  author: seo_config.forgotPassword.author,
};

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
