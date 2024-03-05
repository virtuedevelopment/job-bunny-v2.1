import React from "react";
import styles from "@/app/(Routes)/(Auth)/auth.module.css";
import Link from "next/link";
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function SignupFailure() {
  return (
    <main className={styles.main}>
      <section className={styles.messagePage}>
        <FontAwesomeIcon
          style={{ color: "#e34234" }}
          className={styles.icon}
          icon={faXmarkCircle}
        />
        <h1>Something went wrong...</h1>
        <p>
          Please go to the <Link href={"/signup"}>signup</Link> page to try again.
        </p>
      </section>
    </main>
  );
}
