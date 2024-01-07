import React from "react";
import styles from "./navbar.module.css";
import configurations from "@/_data/config";
import Link from "next/link";
import Authbox from "./Authbox";
import Mobilenav from "./Mobilenav";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Mobilenav />

      <Link className="logo" href={"/"}>
        #jobbunny
      </Link>

      <ul>
        {configurations.mainRoutes.map((route) => (
          <li key={route.route} >
            <Link href={route.url}>{route.route}</Link>
          </li>
        ))}
      </ul>

      <Authbox />
    </nav>
  );
}
