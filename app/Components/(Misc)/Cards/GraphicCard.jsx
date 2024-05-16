"use client";
import React, { useState, useEffect } from "react";
import styles from "./cards.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GraphicCard({ graphic, title, message }) {
  const { data, status } = useSession(); //to check session
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    if (data?.user) {
      setLoggedIn(true);
    }
  }, [data]);

  return (
    <div className={styles.graphicCard}>
      <div className={styles.imagebox}>
        <Image src={graphic} width={150} height={150} alt="graphic" />
      </div>
      <div className={styles.infobox}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Link href={loggedin ? "/dashboard" : "/login"}>
          Get Started
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}
