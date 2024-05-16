"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";

export default function JobFeatureCard({ text, icon }) {
  const { data, status } = useSession(); //to check session
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(()=>{
    if (data?.user){
      setLoggedIn(true)
    }
  },[data])

  return (
    <Link
      href={{ pathname: loggedin ? ("/dashboard/search"):("/search"), query: { search: text } }}
      className={styles.jobFeatureCard}
    >
      <FontAwesomeIcon icon={icon} />
      <small>{text}</small>
    </Link>
  );
}
