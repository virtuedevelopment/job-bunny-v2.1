import React from "react";
import seo_config from "@/_data/seo";
import configurations from "@/_data/config";
import styles from "./autoapply.module.css";
import Locked from "@/app/Components/(Misc)/Locked";

export const metadata = {
  title: seo_config.autoApply.title,
  description: seo_config.autoApply.description,
  keywords: seo_config.autoApply.keywords,
  author: seo_config.autoApply.author,
};

export default function AutoApply() {
  return (
    <main className={styles.main}>
      <Locked message={"This feature is currently locked."} />
    </main>
  );
}
