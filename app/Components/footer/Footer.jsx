"use client"

import React from "react";
import configurations from "@/_data/config";
import styles from "./footer.module.css";
import RedirectButton from "../(Misc)/RedirectButton";
import Link from "next/link";
import { ChevronUp, ChevronRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.main}>
      <div className={styles.navigation}>
        <div className={styles.navigationpoint}>
          <h4>Applying to jobs?</h4>
          <p>Try out our new auto apply feature!</p>
          <Link href={"/"}>View</Link>
        </div>

        <div className={styles.navigationpoint}>
          <h4>Looking for a work visa?</h4>
          <p>Try using our sponsorship filter!</p>
          <Link href={"/"}>View</Link>
        </div>

        <div className={styles.navigationpoint}>
          <h4>Looking for a top company?</h4>
          <p>Check out our company alerts feature!</p>
          <Link href={"/"}>View</Link>
        </div>
      </div>

      <div className={styles.footermenu}>
        <nav className={styles.footeroptions}>
          {configurations.footerRoutes.map((route, index) => (
            <Link key={index} href={route.url}>
              {route.route} <ChevronRight />{" "}
            </Link>
          ))}
        </nav>
        <button onClick={scrollToTop} >
          <ChevronUp />
        </button>
      </div>

      <small className={styles.copy}>
        ©2024 Job Bunny. All rights reserved.
      </small>
    </section>
  );
}
