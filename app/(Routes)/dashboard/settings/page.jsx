import React from "react";
import seo_config from "@/_data/seo";
import styles from "./settings.module.css";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: seo_config.settings.title,
  description: seo_config.settings.description,
  keywords: seo_config.settings.keywords,
  author: seo_config.settings.author,
};

export default function Settings() {
  return (
    <main className={styles.main}>
      <SettingsForm />
    </main>
  );
}
