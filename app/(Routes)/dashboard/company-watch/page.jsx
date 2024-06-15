import React from "react";
import seo_config from "@/_data/seo";
import configurations from "@/_data/config";
import styles from "./company.module.css";
import Locked from "@/app/Components/(Misc)/Locked";

export const metadata = {
  title: seo_config.companyWatch.title,
  description: seo_config.companyWatch.description,
  keywords: seo_config.companyWatch.keywords,
  author: seo_config.companyWatch.author,
};

export default function CompanyWatch() {
  return (
    <main className={styles.main}>
      <Locked message={"This feature is currently locked."} />
    </main>
  );
}
