import React from "react";
import configurations from "@/_data/config";
import styles from "./footer.module.css";
import RedirectButton from "../(Misc)/RedirectButton";
import Link from "next/link";

export default function Footer() {
  return (
    <section className={styles.main}>
      <div className="grid-3x-display">
        <span>
          <h2>Want to apply to 400+ jobs?</h2>
          <small>Use our auto apply feature</small>
        </span>

        <span>
          <h2>Want to immigrate via a job?</h2>
          <small>Use our sponsorship filter</small>
        </span>

        <span>
          <h2>Want to work at a top company?</h2>
          <small>Use our company alerts feature</small>
        </span>
      </div>
      <RedirectButton
        prompt={"Get Started"}
        loggedin={"/dashboard"}
        loggedout={"/signup"}
        theme={"main-button"}
      />
      <p className="logo">#jobbunny</p>
      <div className={styles.footerOptions}>
        <p>{configurations.copyright}</p>
        {configurations.footerRoutes.map((route) => (
          <Link key={route.url} href={route.url}>
            {route.route}
          </Link>
        ))}
      </div>
    </section>
  );
}
