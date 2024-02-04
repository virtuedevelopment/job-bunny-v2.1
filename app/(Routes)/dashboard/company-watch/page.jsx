import React from "react";
import configurations from "@/_data/config";
import styles from "./company.module.css";
import Locked from "@/app/Components/(Misc)/Locked";

export default function CompanyWatch() {
  return (
    <main className={styles.main}>
      <Locked message={"This feature is currently locked."} />
    </main>
  );
}
