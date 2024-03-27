"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./usernav.module.css";
import configurations from "@/_data/config";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Usernav() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data, status } = useSession();

  const handleToggle = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <aside
      className={`${styles.menu} ${
        toggleMenu ? styles.menuOpened : styles.menuClosed
      }`}
    >
      <div className={styles.menuOption}>
        {toggleMenu && <p>Welcome, &nbsp;{data?.user?.name?.first}</p>}
        <button type="button" onClick={handleToggle}>
          <FontAwesomeIcon
            className={styles.menuToggle}
            icon={toggleMenu ? faChevronCircleLeft : faChevronCircleRight}
          />
        </button>
      </div>

      <div className={styles.menuLinkList}>
        {configurations.userRoutes.map((route) => (
          <Link href={route.url} key={route.url} className={styles.menuLink}>
            <FontAwesomeIcon
              icon={route.icon}
              className={styles.menuToggleLink}
            />
            {toggleMenu && <p>{route.route}</p>}
          </Link>
        ))}
      </div>

      <div className={styles.menuOption}>
        {toggleMenu && <p>Logout</p>}
        <button type="button" onClick={handleLogout}>
          <FontAwesomeIcon
            className={styles.menuToggle}
            icon={faRightFromBracket}
          />
        </button>
      </div>
    </aside>
  );
}
