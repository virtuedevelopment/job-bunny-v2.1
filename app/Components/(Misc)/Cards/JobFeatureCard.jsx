import React from "react";
import Link from "next/link";
import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JobFeatureCard({ text, icon }) {
  return (
    <Link
      href={{ pathname: "/dashboard/search", query: { search: text } }}
      className={styles.jobFeatureCard}
    >
      <FontAwesomeIcon icon={icon} />
      <small>{text}</small>
    </Link>
  );
}
