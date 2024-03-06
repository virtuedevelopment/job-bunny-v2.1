import React from "react";
import styles from "./settings.module.css";
import SettingsForm from "./SettingsForm";

export default function Settings() {
  return (
    <main className={styles.main}>
      <SettingsForm />
    </main>
  );
}
