import React from "react";
import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function JobFeatureCard({ text, icon }) {
  return (
    <div className={styles.jobFeatureCard}>
      <FontAwesomeIcon icon={icon} />
      <small>{text}</small>
    </div>
  );
}
