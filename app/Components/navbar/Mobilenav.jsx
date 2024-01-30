"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./navbar.module.css";
import { faBars, faCircleXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import configurations from "@/_data/config";
import Link from "next/link";

export default function Mobilenav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const { data, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <button onClick={toggleNav} className={styles.mobilenavbutton}>
        <FontAwesomeIcon className={styles.icon} icon={faBars} />
      </button>

      <aside className={isOpen ? styles.mobileAsideOpen : styles.mobileAside}>
        <span className={styles.closeButton}>
          <p>Menu</p>
          <button onClick={toggleNav}>
            <FontAwesomeIcon className={styles.icon} icon={faCircleXmark} />
          </button>
        </span>
        {configurations.mainRoutes.map((route) => (
          <Link className={styles.asideLink} key={route.route} href={route.url}>
            <span onClick={toggleNav}>
              <FontAwesomeIcon icon={route.icon} /> <p>{route.route}</p>
            </span>
          </Link>
        ))}

        {data ? (
          <>
            {configurations.userRoutes.map((route) => (
              <Link
                className={styles.asideLink}
                key={route.route}
                href={route.url}
              >
                <span onClick={toggleNav}>
                  <FontAwesomeIcon icon={route.icon} /> <p>{route.route}</p>
                </span>
              </Link>
            ))}

            <Link href={'/login'} className={styles.asideLink} onClick={handleLogout}>
              <span onClick={toggleNav}>
                <FontAwesomeIcon icon={faRightFromBracket} /> <p>Logout</p>
              </span>
            </Link>
          </>
        ) : (
          <>
            {configurations.authRoutes.map((route) => (
              <Link
                className={styles.asideLink}
                key={route.route}
                href={route.url}
              >
                <span onClick={toggleNav}>
                  <FontAwesomeIcon icon={route.icon} /> <p>{route.route}</p>
                </span>
              </Link>
            ))}
          </>
        )}
      </aside>
    </>
  );
}
